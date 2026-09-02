import { useEffect, useState } from 'react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonTitle,
  IonBackButton, IonButtons, IonCard, IonCardContent, IonLoading
} from '@ionic/react';
import contactService, { type SupportContact } from '../services/contact.service';

export default function Contacts() {
  const [contacts, setContacts] = useState<SupportContact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    contactService.findAll().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="Volver" />
          </IonButtons>
          <IonTitle>Mis Contactos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={loading} message="Cargando contactos..." />
        {!loading && contacts.length === 0 && (
          <div className="empty-state">
            <p>No hay contactos de apoyo registrados.</p>
          </div>
        )}
        {!loading && contacts.length > 0 && (
          <div className="contact-list">
            {contacts.map((contact) => (
              <IonCard key={contact.id}>
                <IonCardContent>
                  <div className="contact-card">
                    <div className="contact-avatar">👤</div>
                    <div className="contact-info">
                      <h3 className="contact-name">{contact.name}</h3>
                      <p className="contact-role">{contact.role}</p>
                      <a href={`tel:${contact.phone}`} className="contact-phone">
                        📞 {contact.phone}
                      </a>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}
