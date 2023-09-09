import RadioButton, {
  type RadioButtonProps,
} from "~/components/ui/radio-button";

const LengthRadioButton: React.FC<RadioButtonProps> = ({ title, ...rest }) => {
  return (
    <RadioButton {...rest} className=" max-w-[15rem]">
      <h5 className="text-center font-medium">{title}</h5>
    </RadioButton>
  );
};

export default LengthRadioButton;
