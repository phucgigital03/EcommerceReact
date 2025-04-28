

const InputField = ({
    id,
    label,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
    disabled
})=>{

    return (
        <div className="flex flex-col gap-1 w-full">
            <label 
                htmlFor={id}
                className={`${
                    className ? className : ""
                } font-semibold text-sm text-slate-800`}
            >
                {label}
            </label>
            <input 
                disabled={disabled}
                type={type} 
                id={id}
                placeholder={placeholder}
                value={value}
                className={` ${
                    className ? className : ""
                } py-2 px-2 border outline-none bg-transparent text-slate-800 rounded-md 
                ${errors[id]?.message ? "border-red-800" : "border-slate-800"}
                `}
                {...register(id,{
                    required: {value: required, message},
                    minLength: min 
                        ? {value: min , message: `Minimum ${min} characters is required`} 
                        : null,
                    pattern: type === "email"
                        ? {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid Email"
                        }
                        : type === "url"
                        ? {
                            value: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*(\?.*)?(#.*)?$/,
                            message: "Please enter a valid email"
                        }
                        : null,
                })}
            />

            {
                errors[id]?.message && 
                (
                    <p className="mt-0 text-red-700 text-sm font-semibold">
                        {errors[id]?.message}
                    </p>
                )
            }
        </div>
    )
}

export default InputField

