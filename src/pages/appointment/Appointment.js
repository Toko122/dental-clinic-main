import React, { useState, useEffect } from 'react';
import './Appointment.css';
import servicesData from '../../data/servicesData/ServicesData';
import axios from 'axios';
import { MdErrorOutline } from "react-icons/md";
import { useTranslation } from 'react-i18next';
import { FaCheckCircle } from 'react-icons/fa';

export const Appointment = () => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    date: '',
    service: '',
    message: '',
  });

  const [message, setMessage] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const token = localStorage.getItem('token');

      const res = await axios.post(
        'http://localhost:5000/api/appointments/book',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setMessage(true)
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          date: '',
          service: '',
          message: '',
        });
      }
    } catch (err) {
      setErrorMessage(true)
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const { t, i18n } = useTranslation();


  return (
    <section className='appointment_sect'>
      <div className='appointment_container'>
        <h2>{t("RequestAppointmentTitle")}</h2>
        <form onSubmit={handleSubmit} className='appointment_form'>
          
          <div className='inputes-div'>
            <div className='input-div'>
              <input
                type='text'
                name='name'
                placeholder={t("appointmentName")}
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type='text'
                name='lastname'
                placeholder={t("appointmentLastName")}
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>

            <div className='input-div'>
              <input
                type='email'
                name='email'
                placeholder={t("appointmentEmail")}
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type='tel'
                name='phone'
                placeholder={t("contactPhone")}
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <input
              type='date'
              name='date'
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <h1> {t("chooseServices")} </h1>
          <div className='service_selection'>
            {servicesData.map((serviceApp, index) => (
              <div
                key={index}
                className={`appointment_item ${
                  formData.service === serviceApp.name ? 'active' : ''
                }`}
                onClick={() =>
                  setFormData({ ...formData, service: serviceApp.name })
                }
              >
                <img src={serviceApp.image} alt={serviceApp.name} />
                <p>{t(serviceApp.name)}</p>
              </div>
            ))}
          </div>

          <div className='button'>
            <button type='submit' disabled={loading}>
              {loading ? t("RequestBTnLoading") : t("RequestBTn")}
            </button>
          </div>
        </form>
      </div>

        { message && (
          <div className='message_container'>
              <FaCheckCircle style={{ color: 'green', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '13px' : '16px' }}>{t("MessageApp")}</p>
          </div>
        )}

        { errorMessage && (
          <div className='message_container'>
              <MdErrorOutline style={{ color: 'red', fontSize: '24px' }} />
              <p style={{ fontSize: i18n.language === 'ge' ? '12px' : '16px' }}>{t("errorMessageApp")}</p>
          </div>
        )}
    </section>
  );
};
