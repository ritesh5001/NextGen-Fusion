import { LuArrowUpRight } from "react-icons/lu";
import styles from './Button.module.css';

type ButtonProps = {
  bgColor: string;
  text: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
};

function Button({ bgColor, text, href, onClick, type = 'button', disabled = false, className = '' }: ButtonProps) {
  const buttonContent = (
    <div
      className= {`${styles.masker} flex items-center gap-2 overflow-hidden 
      relative cursor-pointer`}
    >
      <span
        className={`${styles.spanMask} font-[Sansita] text-[1.8vh] 
        capitalize tracking-normal
        font-semibold`}
      >
        {text}
      </span>
      <LuArrowUpRight
        style={{
          fontSize: "24px",
          color: "black",
        }}
        className={`${styles.iconMask}`}
      />
      </div>
  );

  const outerClassName = `${bgColor} section w-fit sm:w-fit px-4 
      py-[1.6vh] border-[1px] border-[--black] ${disabled ? 'opacity-60' : ''} ${className}`;

  return (
    <div className={outerClassName}>
      {href ? (
        <a href={href} className='block'>
          {buttonContent}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className="block w-full text-left">
          {buttonContent}
        </button>
      )}
    </div>
  )
}

export default Button
