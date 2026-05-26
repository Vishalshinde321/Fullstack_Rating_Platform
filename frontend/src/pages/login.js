import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      if (res.data.role === 'Admin') navigate('/admin');
      else alert('Logged in as ' + res.data.role);
    } catch (err) {
      alert('Authentication Failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Unified Login Platform</h2>
      <form onSubmit={handleLogin}>
        <div><label>Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{width:'100%', margin:'8px 0'}}/></div>
        <div><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{width:'100%', margin:'8px 0'}}/></div>
        <button type="submit" style={{width:'100%', padding:'10px', background:'#007bff', color:'#fff', border:'none'}}>Sign In</button>
      </form>
    </div>
  );
}
