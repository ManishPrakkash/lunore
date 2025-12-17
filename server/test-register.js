const testData = {
    email: 'manish@gmail.com',
    password: 'admin123',
    name: 'Manish Prakkash'
};

console.log('Testing registration endpoint...');
console.log('Request data:', testData);

try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(testData)
    });

    const data = await response.json();
    console.log('\nResponse status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
} catch (error) {
    console.error('Error:', error.message);
}
