import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import classes from "./EmailModal.module.css";

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: string | null;
  jobLocation: string | null;
  skillSets: string[];
}

interface Location {
  id: number;
  stressAddressDetail: string;
  city: string;
  locationId: number;
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
  evidence?: string;
  taxCode?: string;
  companyStatus?: number;
  companyLocations: Location[];
  companyEmails?: string[];
}

interface EmailModalProps {
  visible: boolean;
  onClose: () => void;
  onSend: (emailData: { email: string; body: string }) => void;
  companyDataa: Company | undefined;
}

const EmailModal: React.FC<EmailModalProps> = ({
  visible,
  onClose,
  onSend,
  companyDataa,
}) => {
  const defaultEmail = companyDataa?.companyEmails?.[0] || "";
  // const [email, setEmail] = useState(defaultEmail);
  console.log("Email", defaultEmail);
  const [body, setBody] = useState("");

  const handleSend = () => {
    if (!defaultEmail || !body) {
      return Modal.warning({
        title: "Missing Fields",
        content: "Please fill out both Email Address and Email Content.",
      });
    }

    onSend({ email: defaultEmail, body }); // Send the required data
    setBody(""); // Reset body
    onClose(); 
  };

  return (
    <Modal
      title="Send Email"
      visible={visible}
      onCancel={onClose}
      footer={null}
      centered
      className={classes.modal}
      zIndex={4000}
    >
      <div className={classes.content}>
        <label className={classes.label}>Email Address:</label>
        <Input
          placeholder="Enter recipient's email address"
          value={defaultEmail}
          disabled={true}
          // onChange={(e) => setEmail(e.target.value)}
          className={classes.input}
        />
        <label className={classes.label}>Email Content:</label>
        <Input.TextArea
          placeholder="Write your email content here..."
          rows={6}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={classes.textarea}
        />
        <div className={classes.footer}>
          <Button className={classes.cancel} onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" onClick={handleSend}>
            Send Email
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailModal;
