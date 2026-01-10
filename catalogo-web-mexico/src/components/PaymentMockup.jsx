import React, { useState } from 'react';
import './PaymentMockup.css';

const PaymentMockup = ({ service, onClose }) => {
  const [step, setStep] = useState(1); // 1: Información, 2: Pago, 3: Confirmación
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    paymentMethod: 'stripe'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
        <button className="payment-close" onClick={onClose}>✕</button>

        <div className="payment-header">
          <h2>Solicitar Cotización</h2>
          <div className="payment-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Información</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Pago</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirmación</span>
            </div>
          </div>
        </div>

        <div className="payment-body">
          {step === 1 && (
            <div className="step-content">
              <div className="service-summary">
                <h3>{service.title}</h3>
                <p className="service-category">Categoría: {service.category}</p>
              </div>

              <form className="payment-form">
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Juan Pérez"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="juan@empresa.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+52 55 1234 5678"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Mi Empresa S.A. de C.V."
                  />
                </div>

                <div className="form-group">
                  <label>Mensaje / Requerimientos</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Cuéntanos más sobre tu proyecto..."
                    rows="4"
                  ></textarea>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="step-content">
              <h3>Método de Pago (Mockup)</h3>
              <p className="mockup-notice">
                ⚠️ Esta es una demostración. No se procesarán pagos reales.
              </p>

              <div className="payment-methods">
                <div
                  className={`payment-method ${formData.paymentMethod === 'stripe' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'stripe' })}
                >
                  <div className="method-logo stripe-logo">Stripe</div>
                  <p>Tarjeta de crédito/débito</p>
                </div>

                <div
                  className={`payment-method ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                >
                  <div className="method-logo paypal-logo">PayPal</div>
                  <p>Cuenta PayPal</p>
                </div>

                <div
                  className={`payment-method ${formData.paymentMethod === 'mercadopago' ? 'selected' : ''}`}
                  onClick={() => setFormData({ ...formData, paymentMethod: 'mercadopago' })}
                >
                  <div className="method-logo mercadopago-logo">MercadoPago</div>
                  <p>Múltiples opciones</p>
                </div>
              </div>

              {formData.paymentMethod === 'stripe' && (
                <div className="card-form">
                  <div className="form-group">
                    <label>Número de Tarjeta</label>
                    <input type="text" placeholder="4242 4242 4242 4242" disabled />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Vencimiento</label>
                      <input type="text" placeholder="MM/AA" disabled />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" disabled />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="step-content confirmation">
              <div className="success-icon">✓</div>
              <h3>¡Solicitud Enviada!</h3>
              <p>Gracias por tu interés en <strong>{service.title}</strong></p>
              <p>Hemos recibido tu solicitud de cotización. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas.</p>
              
              <div className="confirmation-details">
                <p><strong>Correo:</strong> {formData.email}</p>
                <p><strong>Teléfono:</strong> {formData.phone}</p>
                <p><strong>Método de pago seleccionado:</strong> {formData.paymentMethod.toUpperCase()}</p>
              </div>

              <p className="mockup-reminder">
                💡 Recuerda: Esta es una demostración. En producción, aquí se procesaría el pago real.
              </p>
            </div>
          )}
        </div>

        <div className="payment-footer">
          {step < 3 && (
            <>
              {step > 1 && (
                <button className="btn-secondary" onClick={handleBack}>
                  ← Atrás
                </button>
              )}
              <button className="btn-primary" onClick={step === 2 ? handleSubmit : handleNext}>
                {step === 2 ? 'Enviar Solicitud' : 'Continuar →'}
              </button>
            </>
          )}
          {step === 3 && (
            <button className="btn-primary" onClick={onClose}>
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentMockup;
