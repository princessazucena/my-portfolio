import React from 'react';
import ContactVault from '../components/ContactVault';

export default function ContactPage({ triggerToast }) {
  return (
    <div className="pt-24 pb-16">
      <ContactVault triggerToast={triggerToast} />
    </div>
  );
}
