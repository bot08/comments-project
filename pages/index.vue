<template>
  <div class="flex justify-center mt-4 md:mt-8 lg:mt-12 px-4">
    <div class="max-w-5xl">
      <BaseTextLarge>
        <BaseTextGradient>
          {{ $t('pages.index.welcomeBigText') }}
        </BaseTextGradient>
      </BaseTextLarge>
      <BaseTextMedium class="my-4 dark:text-white transition-colors">
        {{ $t('pages.index.welcomeSmallText') }}
      </BaseTextMedium>
    </div>
  </div>
</template>


<script setup>
const { t } = useI18n()

useSeoMeta({
  title: t('pages.index.title'),
  description: t('pages.index.description'),
})

</script>