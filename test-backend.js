#!/usr/bin/env node

const axios = require('axios');

const API_BASE = 'http://localhost:3001';

async function testBackend() {
  console.log('🧪 Testing Backend Connectivity...\n');

  try {
    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check passed:', healthResponse.data);

    // Test 2: Login test
    console.log('\n2️⃣ Testing login endpoint...');
    const loginData = {
      username: 'admin',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${API_BASE}/auth/login`, loginData);
    console.log('✅ Login successful!');
    console.log('User:', loginResponse.data.user);
    console.log('Token:', loginResponse.data.access_token.substring(0, 20) + '...');

    // Test 3: Protected route
    console.log('\n3️⃣ Testing protected route...');
    const token = loginResponse.data.access_token;
    const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile access successful:', profileResponse.data);

    console.log('\n🎉 All tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('\n❌ Backend connectivity failed:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Is the backend running on port 3001?');
    } else {
      console.error('Error:', error.message);
    }

    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Make sure backend is running: npm run start:dev');
    console.log('2. Check if MySQL is running');
    console.log('3. Verify seed data was created: npm run seed');
  }
}

testBackend();