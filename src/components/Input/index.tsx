type InputProps = {
  type: "number" | "string"; // TODO check this vs the input element?
  name: string;
  value: string | number; // TODO: Can this be chcked vs the type?
  onChange?: any;
};

export default function Input({ type, name, value, onChange }: InputProps) {
  const styling =
    "w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={styling}
    />
  );
}
