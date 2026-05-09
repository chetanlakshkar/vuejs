<script setup lang="ts">
const user = {
  name: 'John Doe',
  role: 'Admin',
  avatar: 'https://i.pravatar.cc/80?img=12',
}
</script>

<template>
  <div class="d-flex align-center ga-3">
    <div class="text-end d-none d-sm-block">
      <div class="text-body-1 font-weight-medium">
        {{ user.name }}
      </div>
      <div class="text-caption text-medium-emphasis">
        {{ user.role }}
      </div>
    </div>
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="success"
      bordered
    >
      <VAvatar
        size="40"
        :image="user.avatar"
      />
    </VBadge>
  </div>
</template>
