export type PhraseCategory = 'essential' | 'transport' | 'food' | 'money' | 'help';

export interface TravelPhrase {
  id: string;
  category: PhraseCategory;
  vi: string;
  zh: string;
  romanization: string;
  note?: string;
}

export interface TaxiDestination {
  id: string;
  nameVi: string;
  nameZh: string;
  nameEn: string;
  addressZh: string;
  addressEn: string;
  speech: string;
  romanization: string;
  mapQuery: string;
}

export interface MoneyNumber {
  value: string;
  zh: string;
  romanization: string;
}

export const phraseCategoryLabels: Record<PhraseCategory, string> = {
  essential: 'Thiết yếu',
  transport: 'Đi lại',
  food: 'Ăn uống',
  money: 'Tiền TWD',
  help: 'Cần giúp',
};

export const moneyNumbers: readonly MoneyNumber[] = [
  { value: '0', zh: '零', romanization: 'líng' },
  { value: '1', zh: '一', romanization: 'yī' },
  { value: '2', zh: '二 / 兩', romanization: 'èr / liǎng' },
  { value: '3', zh: '三', romanization: 'sān' },
  { value: '4', zh: '四', romanization: 'sì' },
  { value: '5', zh: '五', romanization: 'wǔ' },
  { value: '6', zh: '六', romanization: 'liù' },
  { value: '7', zh: '七', romanization: 'qī' },
  { value: '8', zh: '八', romanization: 'bā' },
  { value: '9', zh: '九', romanization: 'jiǔ' },
  { value: '10', zh: '十', romanization: 'shí' },
  { value: '100', zh: '百', romanization: 'bǎi' },
  { value: '1.000', zh: '千', romanization: 'qiān' },
];

export const travelPhrases: readonly TravelPhrase[] = [
  {
    id: 'price',
    category: 'essential',
    vi: 'Cái này bao nhiêu?',
    zh: '這個多少錢？',
    romanization: 'Zhège duōshǎo qián?',
    note: 'Lịch sự hơn: thêm 請問 (Qǐngwèn) ở đầu.',
  },
  {
    id: 'toilet',
    category: 'essential',
    vi: 'Nhà vệ sinh ở đâu?',
    zh: '洗手間在哪裡？',
    romanization: 'Xǐshǒujiān zài nǎlǐ?',
  },
  {
    id: 'card',
    category: 'essential',
    vi: 'Quẹt thẻ được không?',
    zh: '可以刷卡嗎？',
    romanization: 'Kěyǐ shuākǎ ma?',
  },
  {
    id: 'type-price',
    category: 'essential',
    vi: 'Gõ giá vào điện thoại.',
    zh: '請把價格打在手機上。',
    romanization: 'Qǐng bǎ jiàgé dǎ zài shǒujī shàng.',
  },
  {
    id: 'speak-slowly',
    category: 'essential',
    vi: 'Nói chậm một chút.',
    zh: '請說慢一點。',
    romanization: 'Qǐng shuō màn yìdiǎn.',
  },
  {
    id: 'dont-understand',
    category: 'essential',
    vi: 'Mình không hiểu.',
    zh: '我聽不懂。',
    romanization: 'Wǒ tīng bù dǒng.',
  },
  {
    id: 'mrt',
    category: 'transport',
    vi: 'Ga MRT ở đâu?',
    zh: '捷運站在哪裡？',
    romanization: 'Jiéyùn zhàn zài nǎlǐ?',
  },
  {
    id: 'bus-destination',
    category: 'transport',
    vi: 'Xe này có đến đây không?',
    zh: '這班車有到這裡嗎？',
    romanization: 'Zhè bān chē yǒu dào zhèlǐ ma?',
    note: 'Mở bản đồ rồi chỉ vào điểm đến khi hỏi.',
  },
  {
    id: 'where-off',
    category: 'transport',
    vi: 'Xuống trạm nào?',
    zh: '哪一站下車？',
    romanization: 'Nǎ yí zhàn xiàchē?',
  },
  {
    id: 'missed-ride',
    category: 'transport',
    vi: 'Lỡ chuyến rồi. Chuyến sau?',
    zh: '錯過了。下一班呢？',
    romanization: 'Cuòguò le. Xià yì bān ne?',
  },
  {
    id: 'taxi-call',
    category: 'transport',
    vi: 'Gọi taxi giúp mình.',
    zh: '請幫我叫計程車。',
    romanization: 'Qǐng bāng wǒ jiào jìchéngchē.',
  },
  {
    id: 'taxi-address',
    category: 'transport',
    vi: 'Đến địa chỉ này.',
    zh: '去這個地址。',
    romanization: 'Qù zhège dìzhǐ.',
  },
  {
    id: 'get-off-here',
    category: 'transport',
    vi: 'Xuống ở đây.',
    zh: '這裡下車。',
    romanization: 'Zhèlǐ xiàchē.',
  },
  {
    id: 'no-spicy',
    category: 'food',
    vi: 'Không cay.',
    zh: '不要辣。',
    romanization: 'Bú yào là.',
  },
  {
    id: 'water',
    category: 'food',
    vi: 'Một ly nước.',
    zh: '一杯水。',
    romanization: 'Yì bēi shuǐ.',
  },
  {
    id: 'english-menu',
    category: 'food',
    vi: 'Có thực đơn tiếng Anh không?',
    zh: '有英文菜單嗎？',
    romanization: 'Yǒu Yīngwén càidān ma?',
  },
  {
    id: 'food-price',
    category: 'food',
    vi: 'Món này bao nhiêu?',
    zh: '這道菜多少錢？',
    romanization: 'Zhè dào cài duōshǎo qián?',
  },
  {
    id: 'order-this',
    category: 'food',
    vi: 'Mình lấy món này.',
    zh: '我要這個。',
    romanization: 'Wǒ yào zhège.',
  },
  {
    id: 'bill',
    category: 'food',
    vi: 'Tính tiền.',
    zh: '我要結帳。',
    romanization: 'Wǒ yào jiézhàng.',
  },
  {
    id: 'twd-name',
    category: 'money',
    vi: 'Đô la Đài Loan',
    zh: '新台幣',
    romanization: 'Xīntáibì',
    note: 'Ký hiệu: NT$ hoặc TWD.',
  },
  {
    id: 'money-how-much',
    category: 'money',
    vi: 'Bao nhiêu tiền?',
    zh: '多少錢？',
    romanization: 'Duōshǎo qián?',
  },
  {
    id: 'money-10',
    category: 'money',
    vi: '10 TWD',
    zh: '十塊',
    romanization: 'Shí kuài',
  },
  {
    id: 'money-50',
    category: 'money',
    vi: '50 TWD',
    zh: '五十塊',
    romanization: 'Wǔshí kuài',
  },
  {
    id: 'money-100',
    category: 'money',
    vi: '100 TWD',
    zh: '一百塊',
    romanization: 'Yìbǎi kuài',
  },
  {
    id: 'money-150',
    category: 'money',
    vi: '150 TWD',
    zh: '一百五十塊',
    romanization: 'Yìbǎi wǔshí kuài',
  },
  {
    id: 'money-230',
    category: 'money',
    vi: '230 TWD',
    zh: '兩百三十塊',
    romanization: 'Liǎngbǎi sānshí kuài',
  },
  {
    id: 'money-1000',
    category: 'money',
    vi: '1.000 TWD',
    zh: '一千塊',
    romanization: 'Yìqiān kuài',
  },
  {
    id: 'cash',
    category: 'money',
    vi: 'Trả tiền mặt.',
    zh: '付現金。',
    romanization: 'Fù xiànjīn.',
  },
  {
    id: 'help',
    category: 'help',
    vi: 'Giúp mình với.',
    zh: '請幫我。',
    romanization: 'Qǐng bāng wǒ.',
  },
  {
    id: 'hospital',
    category: 'help',
    vi: 'Mình cần bệnh viện.',
    zh: '我要去醫院。',
    romanization: 'Wǒ yào qù yīyuàn.',
  },
  {
    id: 'police',
    category: 'help',
    vi: 'Gọi cảnh sát giúp mình.',
    zh: '請幫我報警。',
    romanization: 'Qǐng bāng wǒ bàojǐng.',
  },
];

export const taxiDestinations: readonly TaxiDestination[] = [
  {
    id: 'muzik',
    nameVi: 'Khách sạn Muzik · Ximen',
    nameZh: '儷夏商旅－西門捷運館',
    nameEn: 'Muzik Hotel – Ximen Station Branch',
    addressZh: '台北市萬華區中華路一段90號6樓',
    addressEn: '6F., No. 90, Sec. 1, Zhonghua Rd., Wanhua Dist., Taipei',
    speech: '請帶我去儷夏商旅西門捷運館，地址是台北市萬華區中華路一段九十號六樓，謝謝。',
    romanization: 'Qǐng dài wǒ qù Lìxià Shānglǚ Xīméng Jiéyùn Guǎn. Dìzhǐ shì Táiběi Shì Wànhuá Qū Zhōnghuá Lù Yí Duàn jiǔshí hào liù lóu. Xièxie.',
    mapQuery: '儷夏商旅 西門捷運館 台北市萬華區中華路一段90號6樓',
  },
  {
    id: 'holy-family',
    nameVi: 'Nhà thờ Holy Family',
    nameZh: '天主教台北聖家堂',
    nameEn: 'Holy Family Catholic Church',
    addressZh: '台北市大安區新生南路二段50號',
    addressEn: 'No. 50, Sec. 2, Xinsheng S. Rd., Da’an Dist., Taipei',
    speech: '請帶我去天主教台北聖家堂，地址是台北市大安區新生南路二段五十號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Tiānzhǔjiào Táiběi Shèngjiātáng. Dìzhǐ shì Táiběi Shì Dà’ān Qū Xīnshēng Nán Lù Èr Duàn wǔshí hào. Xièxie.',
    mapQuery: '天主教台北聖家堂 台北市大安區新生南路二段50號',
  },
  {
    id: 'longshan',
    nameVi: 'Chùa Longshan',
    nameZh: '艋舺龍山寺',
    nameEn: 'Bangka Lungshan Temple',
    addressZh: '台北市萬華區廣州街211號',
    addressEn: 'No. 211, Guangzhou St., Wanhua Dist., Taipei',
    speech: '請帶我去艋舺龍山寺，地址是台北市萬華區廣州街二百一十一號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Měngjiǎ Lóngshānsì. Dìzhǐ shì Táiběi Shì Wànhuá Qū Guǎngzhōu Jiē èrbǎi yīshíyī hào. Xièxie.',
    mapQuery: '艋舺龍山寺 台北市萬華區廣州街211號',
  },
  {
    id: 'wu-jia',
    nameVi: 'Mì bò Wu Jia · Beitou',
    nameZh: '吳家牛肉麵店',
    nameEn: 'Wu Jia Beef Noodles',
    addressZh: '台北市北投區中央北路一段224號',
    addressEn: 'No. 224, Sec. 1, Zhongyang N. Rd., Beitou Dist., Taipei',
    speech: '請帶我去吳家牛肉麵店，地址是台北市北投區中央北路一段二百二十四號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Wújiā Niúròumiàn Diàn. Dìzhǐ shì Táiběi Shì Běitóu Qū Zhōngyāng Běi Lù Yí Duàn èrbǎi èrshísì hào. Xièxie.',
    mapQuery: '吳家牛肉麵店 台北市北投區中央北路一段224號',
  },
  {
    id: 'gaia',
    nameVi: 'The Gaia Hotel · Beitou',
    nameZh: '北投大地酒店',
    nameEn: 'The Gaia Hotel Taipei',
    addressZh: '台北市北投區奇岩路1號',
    addressEn: 'No. 1, Qiyan Rd., Beitou Dist., Taipei',
    speech: '請帶我去北投大地酒店，地址是台北市北投區奇岩路一號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Běitóu Dàdì Jiǔdiàn. Dìzhǐ shì Táiběi Shì Běitóu Qū Qíyán Lù yī hào. Xièxie.',
    mapQuery: '北投大地酒店 台北市北投區奇岩路1號',
  },
  {
    id: 'dadaocheng',
    nameVi: 'Bến Dadaocheng',
    nameZh: '大稻埕碼頭',
    nameEn: 'Dadaocheng Wharf',
    addressZh: '台北市大同區民生西路底（五號水門內）',
    addressEn: 'Dadaocheng Wharf, end of Minsheng W. Rd., Datong Dist., Taipei',
    speech: '請帶我去大稻埕碼頭，在台北市大同區民生西路底，五號水門內，謝謝。',
    romanization: 'Qǐng dài wǒ qù Dàdàochéng Mǎtóu, zài Táiběi Shì Dàtóng Qū Mínshēng Xī Lù dǐ, wǔ hào shuǐmén nèi. Xièxie.',
    mapQuery: '大稻埕碼頭 台北市大同區民生西路底 五號水門',
  },
  {
    id: 'a1',
    nameVi: 'Airport MRT A1 · Taipei Main',
    nameZh: '桃園機場捷運 A1 台北車站',
    nameEn: 'Taoyuan Airport MRT A1 · Taipei Main Station',
    addressZh: '台北市中正區鄭州路8號',
    addressEn: 'No. 8, Zhengzhou Rd., Zhongzheng Dist., Taipei',
    speech: '請帶我去桃園機場捷運A1台北車站，地址是台北市中正區鄭州路八號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Táoyuán Jīchǎng Jiéyùn A1 Táiběi Chēzhàn. Dìzhǐ shì Táiběi Shì Zhōngzhèng Qū Zhèngzhōu Lù bā hào. Xièxie.',
    mapQuery: '桃園機場捷運 A1 台北車站 台北市中正區鄭州路8號',
  },
];
