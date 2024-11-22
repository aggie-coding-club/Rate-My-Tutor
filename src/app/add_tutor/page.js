'use client'
import styles from '../client/css/home.module.css';
import Link from 'next/link'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const AddTutor = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        rating: 0,
        subject: ""
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/add_tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    subject: formData.subject,
                    rating: '4'

                })
            });

            if (res.ok) {
                const data = await res.json();
                console.log('Tutor added successfully');
                setFormData({ firstName: "", lastName: "", rating: 0, subject: ""});
            } else {
                console.error("Error adding tutor");
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input 
                        className={styles.tutorfind}
                        type='text'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        className={styles.tutorfind}
                        type='text'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Subject:</label>
                    <input
                        className={styles.tutorfind}    
                        type='text'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type='submit'>Add Tutor</button>
            </form>
        </div>
    )
}

export default AddTutor;