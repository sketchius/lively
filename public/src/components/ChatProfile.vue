<template>
    <div class="message" :class="{'user-message': isUser, 'assistant-message': !isUser}">
      <img :src="profilePicture" class="profile-picture" :alt="name + ' profile'" />
      <div class="message-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    isUser: Boolean,
    name: String,
    profilePicture: String
  });
  </script>
  
  <style scoped>
  .message {
    display: flex;
    align-items: flex-end;
  }
  .profile-picture {
    width: 30px; /* Adjust size as needed */
    height: 30px;
    border-radius: 50%; /* Makes it circular */
    margin-right: 10px;
  }
  /* Add additional styles for .user-message and .assistant-message */
  </style>
  