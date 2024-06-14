const Button = ({
    text,
    type,
    onClick,
    disabled,
    confirmButton,
    buttonSize,
    hidden,
    giveOpacity,
    textAlignment,
}: {
    text: string,
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    disabled?: boolean,
    confirmButton?: boolean,
    buttonSize?: 'xs' | 'lg',
    hidden?: boolean,
    giveOpacity?: boolean,
    textAlignment?: 'center' | 'left' | 'right',
}) => {
    const _textAlignment = textAlignment === 'center' ? 'justify-center' : textAlignment === 'right' ? 'justify-end' : 'justify-start';

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`inline-flex ${buttonSize === 'lg' ? "h-10 px-8" : "h-5 w-20"} rounded-md text-gray-700 text-sm font-medium shadow transition-colors duration-500 hover:bg-gray-200 focus-visible:outline-none focus-visible::ring-1 focus-visible::ring-gray-950 items-center active:scale-90 ${_textAlignment} ${giveOpacity && "opacity-50"} ${!hidden && "hidden"} ${confirmButton ? "bg-red-500 text-white hover:bg-red-500/80" : "bg-white"}`}
        >
            {text}
        </button>
    )
}

export default Button
