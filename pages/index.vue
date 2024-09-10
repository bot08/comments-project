<template>
  <div>
    <BaseCard>
      <div class="p-4">
        <BaseBigText>Large text -></BaseBigText>
        <BaseMediumText>Medium text -></BaseMediumText>
        <BaseNormalText>Base text -></BaseNormalText>
      </div>
    </BaseCard>
    <BaseCard>
      <div class="p-4">
        <BaseBigText>{{ $t('index.welcome') }} -><-</BaseBigText>
        <!-- Store Example -->
        <BaseNormalText>{{ $t('index.current_num') + numStore.num }}</BaseNormalText>
        <BaseVisualFeedback>
          <button @click="updateNumber">Num++</button>
        </BaseVisualFeedback>
      </div>
    </BaseCard>
    <BaseCard>
      <div class="p-4">
        <BaseBigText>{{ $t('index.locales') }}</BaseBigText>
        <BaseVisualFeedback>
          <button @click="setLocale('en')" class="block">English</button>
        </BaseVisualFeedback>
        <BaseVisualFeedback>
          <button @click="setLocale('uk')" class="block">Українська</button>
        </BaseVisualFeedback>
        <BaseVisualFeedback>
          <button @click="setLocale('ja')" class="block">日本語</button>
        </BaseVisualFeedback>
      </div>
    </BaseCard>
    <BaseCard>
      <BaseVisualFeedback>
        <div class="p-4 cursor-pointer">
          <BaseBigText>Press me!!!</BaseBigText>
        </div>
      </BaseVisualFeedback>
      <BaseVisualFeedback>
        <div class="p-4 cursor-pointer">
          <BaseBigText>Press meeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee??????????????!!!!!!!!!!!!</BaseBigText>
        </div>
      </BaseVisualFeedback>
    </BaseCard>
    <BaseVisualFeedback :wFull="true">
      <BaseCard>
        <div class="p-4 cursor-pointer">
          <BaseBigText>Press block!!!</BaseBigText>
        </div>
      </BaseCard>
    </BaseVisualFeedback>
  </div>
</template>


<script setup>
const { setLocale } = useI18n()

definePageMeta({
  title: 'Index Page'
})

const numStore = useNumStore();

const updateNumber = () => {
  numStore.updNum(numStore.num+1);
};
</script>