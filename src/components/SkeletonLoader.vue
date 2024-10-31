<template>
  <div class="skeleton-loader">
    <div class="skeleton-title"></div>
    <div class="skeleton-author"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader',
}
</script>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

.skeleton-title {
  height: 100px;
  width: 100%;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

.skeleton-author {
  height: 20px;
  width: 25%;
  margin-left: auto;
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
}

.skeleton-title,
.skeleton-author {
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0%,
    #f5f5f5 20%,
    #e0e0e0 40%,
    #e0e0e0 100%
  );
  background-size: 200px 100%;
}
</style>
