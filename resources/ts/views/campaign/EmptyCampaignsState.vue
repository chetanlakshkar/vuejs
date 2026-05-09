<script setup lang="ts">
defineEmits<{
  (e: 'new-campaign'): void
}>()
</script>

<template>
  <VCard
    class="empty-state-card pa-12"
    elevation="0"
  >
    <div class="d-flex flex-column align-center text-center ga-8">
      <div class="empty-state-art">
        <svg
          width="360"
          height="260"
          viewBox="0 0 360 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Floating question marks -->
          <text
            x="155"
            y="44"
            font-family="Inter, sans-serif"
            font-size="34"
            font-weight="700"
            fill="#7367F0"
            fill-opacity="0.85"
          >?</text>
          <text
            x="200"
            y="32"
            font-family="Inter, sans-serif"
            font-size="26"
            font-weight="700"
            fill="#7367F0"
            fill-opacity="0.55"
          >?</text>
          <text
            x="180"
            y="68"
            font-family="Inter, sans-serif"
            font-size="20"
            font-weight="700"
            fill="#7367F0"
            fill-opacity="0.4"
          >?</text>

          <!-- Paper sheets behind folder -->
          <rect
            x="208"
            y="58"
            width="124"
            height="14"
            rx="3"
            fill="#C9C5F5"
            fill-opacity="0.6"
          />
          <rect
            x="195"
            y="74"
            width="138"
            height="16"
            rx="3"
            fill="#C9C5F5"
            fill-opacity="0.85"
          />

          <!-- Folder body -->
          <path
            d="M180 96 H320 a14 14 0 0 1 14 14 v94 a14 14 0 0 1 -14 14 H180 a14 14 0 0 1 -14 -14 V110 a14 14 0 0 1 14 -14 z"
            fill="#7367F0"
            fill-opacity="0.85"
          />
          <!-- Folder tab -->
          <path
            d="M178 84 h70 a8 8 0 0 1 8 8 v8 H170 v-8 a8 8 0 0 1 8 -8 z"
            fill="#7367F0"
            fill-opacity="0.95"
          />

          <!-- Big question mark on folder -->
          <text
            x="250"
            y="190"
            text-anchor="middle"
            font-family="Inter, sans-serif"
            font-size="92"
            font-weight="700"
            fill="white"
            fill-opacity="0.95"
          >?</text>

          <!-- Person body -->
          <!-- Pants -->
          <path
            d="M62 200 L62 248 H82 L86 210 H92 L96 248 H116 L116 200 Z"
            fill="#A6CDFA"
          />
          <!-- Shoes -->
          <rect x="58" y="244" width="28" height="8" rx="3" fill="#3F4357" />
          <rect x="92" y="244" width="28" height="8" rx="3" fill="#3F4357" />
          <!-- Top / sweater -->
          <path
            d="M58 142 Q58 130 70 128 L108 128 Q120 130 120 142 L120 196 Q120 204 110 204 L68 204 Q58 204 58 196 Z"
            fill="#F4A4B5"
          />
          <!-- Right arm reaching forward holding magnifier -->
          <path
            d="M118 156 Q140 162 154 178 L142 192 Q126 180 110 178 Z"
            fill="#F4A4B5"
          />
          <!-- Hand -->
          <circle cx="148" cy="186" r="9" fill="#F8C9B0" />

          <!-- Hair back -->
          <path
            d="M70 110 Q70 88 92 86 Q116 86 116 110 L116 138 L100 138 L100 124 Q92 124 86 130 L70 130 Z"
            fill="#3D3A4F"
          />
          <!-- Face -->
          <path
            d="M76 120 Q76 102 92 102 Q108 102 108 120 L108 134 Q108 142 100 142 L84 142 Q76 142 76 134 Z"
            fill="#F8C9B0"
          />
          <!-- Hair bun / fringe -->
          <path
            d="M76 110 Q86 96 100 100 Q108 102 108 112 L92 116 Q82 116 76 120 Z"
            fill="#3D3A4F"
          />
          <!-- Eye -->
          <circle cx="98" cy="120" r="1.8" fill="#3D3A4F" />
          <!-- Smile -->
          <path d="M94 128 Q98 132 102 128" stroke="#3D3A4F" stroke-width="1.5" fill="none" stroke-linecap="round" />

          <!-- Magnifying glass -->
          <circle
            cx="178"
            cy="166"
            r="36"
            fill="white"
            fill-opacity="0.95"
            stroke="#7367F0"
            stroke-width="6"
          />
          <circle
            cx="178"
            cy="166"
            r="28"
            fill="#A6B4F0"
            fill-opacity="0.18"
          />
          <line
            x1="204"
            y1="192"
            x2="222"
            y2="210"
            stroke="#7367F0"
            stroke-width="9"
            stroke-linecap="round"
          />
          <!-- Glass shine -->
          <path
            d="M160 150 Q172 142 188 148"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            fill="none"
            opacity="0.9"
          />
        </svg>
      </div>

      <VBtn
        size="large"
        color="primary"
        rounded="lg"
        @click="$emit('new-campaign')"
      >
        New Campaign
      </VBtn>
    </div>
  </VCard>
</template>

<style lang="scss" scoped>
.empty-state-card {
  background-color: transparent;
  min-block-size: 480px;
}
</style>
