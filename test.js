const axios = require('axios');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

async function testEndpoint() {
  console.log('🧪 Testing /me endpoint...\n');

  try {
    const response = await axios.get(`${BASE_URL}/me`);
    
    console.log('✅ Status Code:', response.status);
    console.log('✅ Content-Type:', response.headers['content-type']);
    console.log('\n📦 Response Data:');
    console.log(JSON.stringify(response.data, null, 2));

    // Validate response structure
    const data = response.data;
    const errors = [];

    // Check required fields
    if (data.status !== 'success') {
      errors.push('❌ status field should be "success"');
    }

    if (!data.user || typeof data.user !== 'object') {
      errors.push('❌ user field is missing or invalid');
    } else {
      if (!data.user.email) errors.push('❌ user.email is missing');
      if (!data.user.name) errors.push('❌ user.name is missing');
      if (!data.user.stack) errors.push('❌ user.stack is missing');
    }

    if (!data.timestamp) {
      errors.push('❌ timestamp field is missing');
    } else {
      // Validate ISO 8601 format
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
      if (!isoRegex.test(data.timestamp)) {
        errors.push('❌ timestamp is not in ISO 8601 format');
      }
    }

    if (!data.fact || typeof data.fact !== 'string') {
      errors.push('❌ fact field is missing or invalid');
    }

    // Check Content-Type header
    if (!response.headers['content-type'].includes('application/json')) {
      errors.push('❌ Content-Type header should be application/json');
    }

    // Display results
    console.log('\n' + '='.repeat(50));
    if (errors.length === 0) {
      console.log('✅ ALL TESTS PASSED!');
      console.log('✅ Response structure is correct');
      console.log('✅ All required fields are present');
      console.log('✅ Content-Type header is correct');
    } else {
      console.log('❌ TESTS FAILED:');
      errors.forEach(error => console.log(error));
    }
    console.log('='.repeat(50));

    // Test timestamp changes on multiple requests
    console.log('\n🔄 Testing timestamp dynamics...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response2 = await axios.get(`${BASE_URL}/me`);
    
    if (response.data.timestamp === response2.data.timestamp) {
      console.log('⚠️  Warning: Timestamps are identical (should update on each request)');
    } else {
      console.log('✅ Timestamp updates correctly on new requests');
    }

    // Test fact changes
    if (response.data.fact === response2.data.fact) {
      console.log('⚠️  Note: Cat facts are identical (this can happen by chance)');
    } else {
      console.log('✅ Cat facts are fetched dynamically');
    }

  } catch (error) {
    console.error('❌ Error testing endpoint:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

// Run tests
console.log(`Testing endpoint: ${BASE_URL}/me\n`);
testEndpoint();
