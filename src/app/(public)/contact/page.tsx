import Contact from "@/components/modules/Contact/Contact";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: "Contact | Imran Khan",
  description:
    "I’m always open to networking, collaborations, and new opportunities. Reach out through any of the platforms below — I’d love to hear from you!",
};


const ContactPage = () => {
  return (
    <div>
      <Contact />
    </div>
  );
};

export default ContactPage;
