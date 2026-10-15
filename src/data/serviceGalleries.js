// Нүүр хуудасны "4 чиглэл" хэсгийн зургийн slider-ууд.
//
// Зураг нэмэх заавар:
// 1. Зургаа тухайн чиглэлийн фолдерт хуулна:
//      src/images/services/academy/  — ESTEL Academy
//      src/images/services/retail/   — Нэрийн дэлгүүр
//      src/images/services/online/   — Борлуулалт, түгээлт & онлайн шоп (хүргэлтийн постер энд)
// 2. Энэ файлын дээд хэсэгт import мөр нэмнэ, жишээ нь:
//      import academy1 from '@/images/services/academy/academy-1.jpg'
// 3. Доорх жагсаалтын харгалзах массивт нэрийг нь нэмнэ. Массив дахь дараалал = slider дахь дараалал.
//
// Хэмжээ нь ямар ч байсан slider 4:3 харьцаагаар тайрч жигд харуулна.
// Массив хоосон бол зургийн оронд дугаартай placeholder гарна.
// Нэг л зурагтай бол сум, цэг автоматаар нуугдана; 2 ба түүнээс дээш бол slider болно.

import imageEstelAcademySession from '@/images/estel-academy-session.jpg'
import imageHairAcademyTraining from '@/images/hair-academy-training.jpg'

export const serviceGalleries = {
  academy: [imageHairAcademyTraining, imageEstelAcademySession],
  salon: [],
  retail: [],
  online: [],
}
