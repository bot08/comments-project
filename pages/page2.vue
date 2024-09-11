<template>
  <BaseCard>
    <div class="p-4">
      <BaseBigText>Slots*</BaseBigText>
      <TestSlots/>
      <BaseVisualFeedback>
        <NuxtLink to="/">Index page</NuxtLink>
      </BaseVisualFeedback>
    </div>
    <BaseVisualFeedback>
      <button @click="registerUser()">TEST REGISTER</button>
    </BaseVisualFeedback>
    <BaseVisualFeedback>
      <button @click="loginUser()">TEST LOGIN</button>
    </BaseVisualFeedback>
    <BaseVisualFeedback>
      <button @click="updateUser()">TEST UPD</button>
    </BaseVisualFeedback>
  </BaseCard>
</template>


<script setup>
async function registerUser() {
  const response = await fetch('/api/users/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test',
      email: '123@example.com',
      password: 'password123',
      site_code: '123123',
    }),
  });

  if (!response.ok) {
    console.error('Not reg:', await response.json());
    return;
  }

  const data = await response.json();
  console.log('good:', data);
}

async function loginUser() {
  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: '123@example.com',
      password: 'password123',
    }),
  });

  if (!response.ok) {
    console.error('1:', await response.json());
    return;
  }

  const data = await response.json();
  console.log('0:', data);
}

async function updateUser() {
  const response = await fetch('/api/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmUwOWRjNzk2ZmQ1ZTk2MGM2Nzc1NmYiLCJyb2xlIjoidXNlciIsImlhdCI6MTcyNTk5NzE4MCwiZXhwIjoxNzI2MDgzNTgwfQ.1ddR-dNBSmmzlYx_oW3LS_klJ_04frTntGK1AQNl89k'}`
    },
    body: JSON.stringify({
      name: 'Test222',
    }),
  });

  if (!response.ok) {
    console.error('1:', await response.json());
    return;
  }

  const data = await response.json();
  console.log('0:', data);
}
</script>