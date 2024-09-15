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
    <BaseVisualFeedback>
      <button @click="meUser()">TEST profile</button>
    </BaseVisualFeedback>
  </BaseCard>
</template>


<script setup>

const authToken = ref('');

async function registerUser() {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test',
      email: '123@example.com',
      password: 'password123',
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
  const response = await fetch('/api/auth/login', {
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

  authToken.value = data.data.access_token ?? '';

  console.log('0:', data);
}

async function updateUser() {
  if (!authToken.value) {
    console.error('No token');
    return;
  }

  const response = await fetch('/api/users/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken.value}`,
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

async function meUser() {
  if (!authToken.value) {
    console.error('No token');
    return;
  }

  const response = await fetch('/api/users/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken.value}`,
    },
  });

  if (!response.ok) {
    console.error('1:', await response.json());
    return;
  }

  const data = await response.json();
  console.log('0:', data);
}

</script>