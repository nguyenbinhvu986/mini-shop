import { CheckoutSectionProps } from "./CheckoutSchema";
import PaymentMethodSection from "./PaymentMethod";
import ShippingInfoSection from "./ShippingInfo";

export default function CheckoutForm({
  values,
  errors,
  onChange,
}: CheckoutSectionProps) {
  return (
    <>
      <ShippingInfoSection
        values={values}
        errors={errors}
        onChange={onChange}
      />
      <PaymentMethodSection
        values={values}
        errors={errors}
        onChange={onChange}
      />
    </>
  );
}
