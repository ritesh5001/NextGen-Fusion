"use client"

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log errors that are not from browser extensions
    if (!this.isBrowserExtensionError(error)) {
      console.error('Application Error:', error, errorInfo)
    }
  }

  private isBrowserExtensionError(error: Error): boolean {
    const extensionErrorPatterns = [
      'tx_attempts_exceeded',
      'tx_ack_timeout',
      'Failed to initialize messaging',
      'host-console-events',
      'host-network-events',
      'host-dom-snapshot',
      'chrome-extension://',
      'moz-extension://',
      'safari-extension://'
    ]

    return extensionErrorPatterns.some(pattern => 
      error.message.includes(pattern) || 
      error.stack?.includes(pattern)
    )
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="glass max-w-md w-full rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-ink mb-2">
              Something went wrong
            </h2>
            
            <p className="text-ink-soft mb-6">
              We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full bg-ink text-white py-2 px-4 rounded-full font-medium hover:bg-ink transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-white/70 text-ink-soft py-2 px-4 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Refresh Page
              </button>
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-sm text-ink-mute hover:text-ink-soft">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                  {this.state.error.message}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary