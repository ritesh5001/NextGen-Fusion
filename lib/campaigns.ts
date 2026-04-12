import {
  AnyBulkWriteOperation,
  ObjectId,
  UpdateFilter,
  WithId,
} from 'mongodb';

import { getMongoDb } from './mongodb';

export type CampaignStatus = 'draft' | 'queued' | 'active' | 'paused' | 'completed';
export type RecipientStatus =
  | 'pending'
  | 'queued'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'failed';
export type CampaignEventType =
  | 'queued'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'failed';

export type CampaignDocument = {
  name: string;
  subject: string;
  htmlBody: string;
  status: CampaignStatus;
  dailyLimit: number;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
};

export type CampaignRecipientDocument = {
  campaignId: ObjectId;
  email: string;
  name?: string;
  status: RecipientStatus;
  scheduledFor?: Date;
  resendMessageId?: string;
  lastError?: string;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  openCount: number;
  clickCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CampaignEventDocument = {
  campaignId: ObjectId;
  recipientId: ObjectId;
  email: string;
  eventType: CampaignEventType;
  providerMessageId?: string;
  providerEventId?: string;
  url?: string;
  error?: string;
  at: Date;
  createdAt: Date;
};

const CAMPAIGNS_COLLECTION = 'campaigns';
const CAMPAIGN_RECIPIENTS_COLLECTION = 'campaign_recipients';
const CAMPAIGN_EVENTS_COLLECTION = 'campaign_events';

let indexesReady = false;

const STATUS_PROGRESS: Record<RecipientStatus, number> = {
  pending: 0,
  queued: 1,
  sent: 2,
  delivered: 3,
  opened: 4,
  clicked: 5,
  failed: 2,
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function toObjectId(id: string) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

function resolveDailyLimit(limit?: number) {
  if (!limit || Number.isNaN(limit)) {
    return 100;
  }

  return Math.max(1, Math.min(1000, Math.floor(limit)));
}

function getRecipientNextStatus(currentStatus: RecipientStatus, nextStatus: RecipientStatus) {
  if (nextStatus === 'failed') {
    return 'failed';
  }

  if (STATUS_PROGRESS[nextStatus] >= STATUS_PROGRESS[currentStatus]) {
    return nextStatus;
  }

  return currentStatus;
}

async function getCollections() {
  const db = await getMongoDb();

  return {
    db,
    campaigns: db.collection<CampaignDocument>(CAMPAIGNS_COLLECTION),
    recipients: db.collection<CampaignRecipientDocument>(CAMPAIGN_RECIPIENTS_COLLECTION),
    events: db.collection<CampaignEventDocument>(CAMPAIGN_EVENTS_COLLECTION),
  };
}

export async function ensureCampaignIndexes() {
  if (indexesReady) {
    return;
  }

  const { campaigns, recipients, events } = await getCollections();

  await campaigns.createIndex({ createdBy: 1, createdAt: -1 });
  await campaigns.createIndex({ status: 1, updatedAt: -1 });

  await recipients.createIndex({ campaignId: 1, email: 1 }, { unique: true });
  await recipients.createIndex({ campaignId: 1, status: 1, scheduledFor: 1 });
  await recipients.createIndex({ status: 1, scheduledFor: 1 });
  await recipients.createIndex({ resendMessageId: 1 }, { sparse: true });

  await events.createIndex({ campaignId: 1, at: -1 });
  await events.createIndex({ recipientId: 1, at: -1 });
  await events.createIndex({ providerEventId: 1 }, { sparse: true });

  indexesReady = true;
}

export async function createCampaign(input: {
  name: string;
  subject: string;
  htmlBody: string;
  createdBy: string;
  dailyLimit?: number;
}) {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();
  const now = new Date();

  const document: CampaignDocument = {
    name: input.name.trim(),
    subject: input.subject.trim(),
    htmlBody: input.htmlBody,
    status: 'draft',
    dailyLimit: resolveDailyLimit(input.dailyLimit),
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
  };

  const result = await campaigns.insertOne(document);

  return {
    ...document,
    _id: result.insertedId,
  };
}

export async function listCampaigns(createdBy?: string) {
  await ensureCampaignIndexes();

  const { campaigns, recipients } = await getCollections();
  const filter = createdBy ? { createdBy } : {};
  const campaignDocs = await campaigns.find(filter).sort({ updatedAt: -1 }).toArray();

  if (!campaignDocs.length) {
    return [];
  }

  const campaignIds = campaignDocs.map((campaign) => campaign._id);
  const recipientStats = await recipients
    .aggregate([
      {
        $match: {
          campaignId: { $in: campaignIds },
        },
      },
      {
        $group: {
          _id: '$campaignId',
          totalRecipients: { $sum: 1 },
          queuedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'queued'] }, 1, 0],
            },
          },
          sentCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'sent'] }, 1, 0],
            },
          },
          deliveredCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0],
            },
          },
          openedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'opened'] }, 1, 0],
            },
          },
          clickedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'clicked'] }, 1, 0],
            },
          },
          failedCount: {
            $sum: {
              $cond: [{ $eq: ['$status', 'failed'] }, 1, 0],
            },
          },
        },
      },
    ])
    .toArray();

  const statsByCampaignId = new Map(
    recipientStats.map((row) => [row._id.toString(), row])
  );

  return campaignDocs.map((campaign) => {
    const stats = statsByCampaignId.get(campaign._id.toString());

    return {
      ...campaign,
      stats: {
        totalRecipients: stats?.totalRecipients || 0,
        queuedCount: stats?.queuedCount || 0,
        sentCount: stats?.sentCount || 0,
        deliveredCount: stats?.deliveredCount || 0,
        openedCount: stats?.openedCount || 0,
        clickedCount: stats?.clickedCount || 0,
        failedCount: stats?.failedCount || 0,
      },
    };
  });
}

export async function getCampaignById(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return null;
  }

  return campaigns.findOne({ _id });
}

export async function updateCampaign(
  campaignId: string,
  updates: Partial<Pick<CampaignDocument, 'name' | 'subject' | 'htmlBody' | 'dailyLimit' | 'status'>>
) {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return null;
  }

  const patch: Partial<CampaignDocument> = {
    updatedAt: new Date(),
  };

  if (updates.name !== undefined) {
    patch.name = updates.name.trim();
  }

  if (updates.subject !== undefined) {
    patch.subject = updates.subject.trim();
  }

  if (updates.htmlBody !== undefined) {
    patch.htmlBody = updates.htmlBody;
  }

  if (updates.dailyLimit !== undefined) {
    patch.dailyLimit = resolveDailyLimit(updates.dailyLimit);
  }

  if (updates.status !== undefined) {
    patch.status = updates.status;
  }

  await campaigns.updateOne({ _id }, { $set: patch });
  return campaigns.findOne({ _id });
}

export function parseCsvRecipients(csvText: string) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return [];
  }

  const firstColumns = lines[0].split(',').map((value) => value.trim().toLowerCase());
  const emailColumnIndex = firstColumns.findIndex((column) => column === 'email');
  const nameColumnIndex = firstColumns.findIndex((column) => column === 'name');
  const dataStartIndex = emailColumnIndex >= 0 ? 1 : 0;

  const recipients: Array<{ email: string; name?: string }> = [];

  for (let i = dataStartIndex; i < lines.length; i += 1) {
    const columns = lines[i].split(',').map((value) => value.trim());
    const emailRaw = emailColumnIndex >= 0 ? columns[emailColumnIndex] : columns[0];
    const nameRaw = nameColumnIndex >= 0 ? columns[nameColumnIndex] : columns[1];

    if (!emailRaw) {
      continue;
    }

    const email = normalizeEmail(emailRaw);

    if (!isValidEmail(email)) {
      continue;
    }

    recipients.push({
      email,
      name: nameRaw || undefined,
    });
  }

  return recipients;
}

export async function addRecipientsToCampaign(
  campaignId: string,
  recipientsInput: Array<{ email: string; name?: string }>
) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _campaignId = toObjectId(campaignId);

  if (!_campaignId) {
    throw new Error('Invalid campaign id.');
  }

  const sanitized = recipientsInput
    .map((item) => ({
      email: normalizeEmail(item.email || ''),
      name: item.name?.trim() || undefined,
    }))
    .filter((item) => isValidEmail(item.email));

  if (!sanitized.length) {
    return {
      insertedCount: 0,
      skippedCount: recipientsInput.length,
    };
  }

  const uniqueByEmail = new Map<string, { email: string; name?: string }>();

  sanitized.forEach((item) => {
    uniqueByEmail.set(item.email, item);
  });

  const deduped = Array.from(uniqueByEmail.values());

  const existing = await recipients
    .find({
      campaignId: _campaignId,
      email: { $in: deduped.map((item) => item.email) },
    })
    .project({ email: 1 })
    .toArray();

  const existingEmailSet = new Set(existing.map((item) => item.email));
  const now = new Date();

  const docs = deduped
    .filter((item) => !existingEmailSet.has(item.email))
    .map((item) => ({
      campaignId: _campaignId,
      email: item.email,
      name: item.name,
      status: 'pending' as const,
      openCount: 0,
      clickCount: 0,
      failedCount: 0,
      createdAt: now,
      updatedAt: now,
    }));

  if (docs.length) {
    await recipients.insertMany(docs, { ordered: false });
  }

  return {
    insertedCount: docs.length,
    skippedCount: recipientsInput.length - docs.length,
  };
}

export async function listCampaignRecipients(campaignId: string, limit = 100) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _campaignId = toObjectId(campaignId);

  if (!_campaignId) {
    return [];
  }

  return recipients
    .find({ campaignId: _campaignId })
    .sort({ updatedAt: -1 })
    .limit(Math.max(1, Math.min(limit, 500)))
    .toArray();
}

export async function queueCampaignRecipients(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns, recipients } = await getCollections();
  const _campaignId = toObjectId(campaignId);

  if (!_campaignId) {
    throw new Error('Invalid campaign id.');
  }

  const campaign = await campaigns.findOne({ _id: _campaignId });

  if (!campaign) {
    throw new Error('Campaign not found.');
  }

  const pendingRecipients = await recipients
    .find({ campaignId: _campaignId, status: { $in: ['pending', 'failed'] } })
    .sort({ createdAt: 1 })
    .toArray();

  if (!pendingRecipients.length) {
    await campaigns.updateOne(
      { _id: _campaignId },
      {
        $set: {
          status: 'active',
          updatedAt: new Date(),
          startedAt: campaign.startedAt || new Date(),
        },
      }
    );

    return { queuedCount: 0 };
  }

  const now = Date.now();
  const intervalMs = Math.floor((24 * 60 * 60 * 1000) / resolveDailyLimit(campaign.dailyLimit));

  const operations: Array<AnyBulkWriteOperation<CampaignRecipientDocument>> = pendingRecipients.map((recipient, index) => ({
    updateOne: {
      filter: { _id: recipient._id },
      update: {
        $set: {
          status: 'queued' as RecipientStatus,
          scheduledFor: new Date(now + index * intervalMs),
          updatedAt: new Date(),
        },
        $unset: {
          lastError: '',
        },
      },
    },
  }));

  await recipients.bulkWrite(operations, { ordered: false });

  await campaigns.updateOne(
    { _id: _campaignId },
    {
      $set: {
        status: 'active',
        updatedAt: new Date(),
        startedAt: campaign.startedAt || new Date(),
      },
    }
  );

  return {
    queuedCount: pendingRecipients.length,
  };
}

export async function pauseCampaign(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return null;
  }

  await campaigns.updateOne(
    { _id },
    {
      $set: {
        status: 'paused',
        updatedAt: new Date(),
      },
    }
  );

  return campaigns.findOne({ _id });
}

export async function resumeCampaign(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return null;
  }

  await campaigns.updateOne(
    { _id },
    {
      $set: {
        status: 'active',
        updatedAt: new Date(),
      },
    }
  );

  return queueCampaignRecipients(campaignId);
}

export async function recordCampaignEvent(input: {
  campaignId: string;
  recipientId: string;
  email: string;
  eventType: CampaignEventType;
  providerMessageId?: string;
  providerEventId?: string;
  url?: string;
  error?: string;
  at?: Date;
}) {
  await ensureCampaignIndexes();

  const { events } = await getCollections();
  const _campaignId = toObjectId(input.campaignId);
  const _recipientId = toObjectId(input.recipientId);

  if (!_campaignId || !_recipientId) {
    return null;
  }

  const now = new Date();
  const document: CampaignEventDocument = {
    campaignId: _campaignId,
    recipientId: _recipientId,
    email: normalizeEmail(input.email),
    eventType: input.eventType,
    providerMessageId: input.providerMessageId,
    providerEventId: input.providerEventId,
    url: input.url,
    error: input.error,
    at: input.at || now,
    createdAt: now,
  };

  await events.insertOne(document);
  return document;
}

export async function markRecipientSent(input: {
  recipientId: string;
  messageId: string;
}) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _recipientId = toObjectId(input.recipientId);

  if (!_recipientId) {
    return null;
  }

  const now = new Date();

  await recipients.updateOne(
    { _id: _recipientId },
    {
      $set: {
        status: 'sent',
        resendMessageId: input.messageId || undefined,
        sentAt: now,
        updatedAt: now,
      },
      $unset: {
        lastError: '',
      },
    }
  );

  return recipients.findOne({ _id: _recipientId });
}

export async function markRecipientFailed(input: {
  recipientId: string;
  errorMessage: string;
}) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _recipientId = toObjectId(input.recipientId);

  if (!_recipientId) {
    return null;
  }

  const now = new Date();

  await recipients.updateOne(
    { _id: _recipientId },
    {
      $set: {
        status: 'failed',
        lastError: input.errorMessage,
        updatedAt: now,
      },
      $inc: {
        failedCount: 1,
      },
    }
  );

  return recipients.findOne({ _id: _recipientId });
}

export async function getRecentSentCount(campaignId: string, since: Date) {
  await ensureCampaignIndexes();

  const { events } = await getCollections();
  const _campaignId = toObjectId(campaignId);

  if (!_campaignId) {
    return 0;
  }

  return events.countDocuments({
    campaignId: _campaignId,
    eventType: 'sent',
    at: {
      $gte: since,
    },
  });
}

export async function getProcessableCampaigns() {
  await ensureCampaignIndexes();

  const { campaigns } = await getCollections();

  return campaigns
    .find({
      status: { $in: ['active', 'queued'] },
    })
    .sort({ updatedAt: 1 })
    .toArray();
}

export async function getDueRecipientsForCampaign(campaignId: string, limit: number) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _campaignId = toObjectId(campaignId);

  if (!_campaignId) {
    return [];
  }

  return recipients
    .find({
      campaignId: _campaignId,
      status: 'queued',
      scheduledFor: { $lte: new Date() },
    })
    .sort({ scheduledFor: 1 })
    .limit(limit)
    .toArray();
}

export async function findRecipientByMessageId(messageId: string) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();

  return recipients.findOne({
    resendMessageId: messageId,
  });
}

export async function applyRecipientEventByMessageId(input: {
  messageId: string;
  eventType: 'delivered' | 'opened' | 'clicked' | 'failed';
  providerEventId?: string;
  eventAt?: Date;
  url?: string;
  error?: string;
}) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const recipient = await findRecipientByMessageId(input.messageId);

  if (!recipient) {
    return null;
  }

  const now = new Date();
  const eventAt = input.eventAt || now;
  const nextStatus = input.eventType === 'failed' ? 'failed' : input.eventType;
  const status = getRecipientNextStatus(recipient.status, nextStatus);

  const setPatch: Partial<CampaignRecipientDocument> = {
    status,
    updatedAt: now,
  };

  if (input.eventType === 'delivered') {
    setPatch.deliveredAt = eventAt;
  }

  if (input.eventType === 'opened') {
    setPatch.openedAt = eventAt;
  }

  if (input.eventType === 'clicked') {
    setPatch.clickedAt = eventAt;
  }

  if (input.eventType === 'failed') {
    setPatch.lastError = input.error || 'Send failed';
  }

  const updateDoc: UpdateFilter<CampaignRecipientDocument> = {
    $set: setPatch,
  };

  if (input.eventType === 'opened') {
    updateDoc.$inc = {
      ...(updateDoc.$inc || {}),
      openCount: 1,
    };
  }

  if (input.eventType === 'clicked') {
    updateDoc.$inc = {
      ...(updateDoc.$inc || {}),
      clickCount: 1,
    };
  }

  if (input.eventType === 'failed') {
    updateDoc.$inc = {
      ...(updateDoc.$inc || {}),
      failedCount: 1,
    };
  }

  await recipients.updateOne({ _id: recipient._id }, updateDoc);

  await recordCampaignEvent({
    campaignId: recipient.campaignId.toString(),
    recipientId: recipient._id.toString(),
    email: recipient.email,
    eventType: input.eventType,
    providerMessageId: input.messageId,
    providerEventId: input.providerEventId,
    url: input.url,
    error: input.error,
    at: eventAt,
  });

  return recipients.findOne({ _id: recipient._id });
}

export async function applyTrackingEvent(input: {
  campaignId: string;
  recipientId: string;
  eventType: 'opened' | 'clicked';
  url?: string;
}) {
  await ensureCampaignIndexes();

  const { recipients } = await getCollections();
  const _campaignId = toObjectId(input.campaignId);
  const _recipientId = toObjectId(input.recipientId);

  if (!_campaignId || !_recipientId) {
    return null;
  }

  const recipient = await recipients.findOne({
    _id: _recipientId,
    campaignId: _campaignId,
  });

  if (!recipient) {
    return null;
  }

  const eventType = input.eventType;
  const now = new Date();
  const status = getRecipientNextStatus(
    recipient.status,
    eventType === 'opened' ? 'opened' : 'clicked'
  );

  const updateDoc: UpdateFilter<CampaignRecipientDocument> = {
    $set: {
      status,
      updatedAt: now,
      ...(eventType === 'opened' ? { openedAt: now } : { clickedAt: now }),
    },
    $inc: {
      ...(eventType === 'opened' ? { openCount: 1 } : { clickCount: 1 }),
    },
  };

  await recipients.updateOne({ _id: recipient._id }, updateDoc);

  await recordCampaignEvent({
    campaignId: input.campaignId,
    recipientId: input.recipientId,
    email: recipient.email,
    eventType,
    url: input.url,
    at: now,
  });

  return recipients.findOne({ _id: recipient._id });
}

export async function refreshCampaignCompletion(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns, recipients } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return;
  }

  const activeCount = await recipients.countDocuments({
    campaignId: _id,
    status: { $in: ['pending', 'queued'] },
  });

  if (activeCount > 0) {
    return;
  }

  await campaigns.updateOne(
    { _id, status: { $in: ['active', 'queued'] } },
    {
      $set: {
        status: 'completed',
        completedAt: new Date(),
        updatedAt: new Date(),
      },
    }
  );
}

export async function getCampaignDetail(campaignId: string) {
  await ensureCampaignIndexes();

  const { campaigns, recipients, events } = await getCollections();
  const _id = toObjectId(campaignId);

  if (!_id) {
    return null;
  }

  const campaign = await campaigns.findOne({ _id });

  if (!campaign) {
    return null;
  }

  const statusCounts = await recipients
    .aggregate([
      {
        $match: {
          campaignId: _id,
        },
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const recipientsList = await recipients.find({ campaignId: _id }).sort({ updatedAt: -1 }).limit(200).toArray();
  const eventList = await events.find({ campaignId: _id }).sort({ at: -1 }).limit(300).toArray();

  const counts: Record<string, number> = {
    pending: 0,
    queued: 0,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    failed: 0,
  };

  statusCounts.forEach((row) => {
    counts[row._id] = row.count;
  });

  return {
    campaign,
    counts,
    recipients: recipientsList,
    events: eventList,
  };
}

export function serializeCampaign(campaign: WithId<CampaignDocument> | null) {
  if (!campaign) {
    return null;
  }

  return {
    ...campaign,
    id: campaign._id.toString(),
  };
}

export function serializeRecipient(recipient: WithId<CampaignRecipientDocument>) {
  return {
    ...recipient,
    id: recipient._id.toString(),
    campaignId: recipient.campaignId.toString(),
  };
}

export function serializeEvent(event: WithId<CampaignEventDocument>) {
  return {
    ...event,
    id: event._id.toString(),
    campaignId: event.campaignId.toString(),
    recipientId: event.recipientId.toString(),
  };
}
