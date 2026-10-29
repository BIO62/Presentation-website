// Нүүр хуудасны "4 чиглэл" хэсгийн зургийн slider-ууд.
//
// Зураг нэмэх заавар:
// 1. Зургаа тухайн чиглэлийн фолдерт хуулна:
//      src/images/site/academy/  — ESTEL Academy
//      src/images/site/b2b/      — B2B худалдаа, бөөний түгээлт (доорх `salon`)
//      src/images/site/retail/   — Нэрийн дэлгүүр
//      src/images/site/online/   — Борлуулалт, түгээлт & онлайн шоп
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ, жишээ нь:
//      import academy07 from '@/images/site/academy/academy-07.jpg'
// 3. Доорх жагсаалтын харгалзах массивт нэрийг нь нэмнэ. Массив дахь дараалал = slider дахь дараалал.
//
// Нэг зургийг хоёр газар бүү давхарлаж ашигла.
// Хэмжээ нь ямар ч байсан slider 4:3 харьцаагаар тайрч жигд харуулна.
// Нэг л зурагтай бол сум, цэг автоматаар нуугдана; массив хоосон бол зураг огт харагдахгүй.

import academy01 from '@/images/site/academy/academy-01.jpg'
import academy02 from '@/images/site/academy/academy-02.jpg'
import academy03 from '@/images/site/academy/academy-03.jpg'
import academy04 from '@/images/site/academy/academy-04.jpg'
import academy05 from '@/images/site/academy/academy-05.jpg'
import academy06 from '@/images/site/academy/academy-06.jpg'
import b2b01 from '@/images/site/b2b/b2b-01.jpg'
import b2b02 from '@/images/site/b2b/b2b-02.jpg'
import b2b03 from '@/images/site/b2b/b2b-03.jpg'
import b2b04 from '@/images/site/b2b/b2b-04.jpg'
import online01 from '@/images/site/online/online-01.jpg'
import online02 from '@/images/site/online/online-02.jpg'
import online03 from '@/images/site/online/online-03.jpg'
import online04 from '@/images/site/online/online-04.jpg'
import retail01 from '@/images/site/retail/retail-01-tara.jpg'
import retail02 from '@/images/site/retail/retail-02-tara.jpg'
import retail03 from '@/images/site/retail/retail-03-tara-synergetic.jpg'
import retail04 from '@/images/site/retail/retail-04-sansar.jpg'
import retail05 from '@/images/site/retail/retail-05-sansar.jpg'
import retail06 from '@/images/site/retail/retail-06-sansar.jpg'
import retail07 from '@/images/site/retail/retail-07-sansar.jpg'

export const serviceGalleries = {
  academy: [academy01, academy02, academy03, academy04, academy05, academy06],
  // B2B худалдаа / бөөний түгээлт
  salon: [b2b01, b2b02, b2b03, b2b04],
  retail: [retail01, retail02, retail03, retail04, retail05, retail06, retail07],
  online: [online01, online02, online03, online04],
}
