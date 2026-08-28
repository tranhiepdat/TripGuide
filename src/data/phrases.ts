export type PhraseCategory = 'essential' | 'transport' | 'food' | 'help';

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
  addressZh: string;
  addressEn: string;
  speech: string;
  romanization: string;
  mapQuery: string;
}

export const phraseCategoryLabels: Record<PhraseCategory, string> = {
  essential: 'Thiết yếu',
  transport: 'Đi lại',
  food: 'Ăn uống',
  help: 'Cần giúp',
};

export const travelPhrases: readonly TravelPhrase[] = [
  {
    id: 'price',
    category: 'essential',
    vi: 'Cho mình hỏi cái này bao nhiêu tiền?',
    zh: '請問這個多少錢？',
    romanization: 'Qǐngwèn zhège duōshǎo qián?',
  },
  {
    id: 'toilet',
    category: 'essential',
    vi: 'Cho mình hỏi nhà vệ sinh ở đâu?',
    zh: '請問洗手間在哪裡？',
    romanization: 'Qǐngwèn xǐshǒujiān zài nǎlǐ?',
  },
  {
    id: 'card',
    category: 'essential',
    vi: 'Có thể thanh toán bằng thẻ không?',
    zh: '可以刷卡嗎？',
    romanization: 'Kěyǐ shuākǎ ma?',
  },
  {
    id: 'type-price',
    category: 'essential',
    vi: 'Bạn có thể nhập giá vào điện thoại giúp mình không?',
    zh: '可以把價格打在手機上嗎？',
    romanization: 'Kěyǐ bǎ jiàgé dǎ zài shǒujī shàng ma?',
  },
  {
    id: 'speak-slowly',
    category: 'essential',
    vi: 'Mình không hiểu tiếng Hoa, bạn nói chậm hơn được không?',
    zh: '我聽不懂中文，可以說慢一點嗎？',
    romanization: 'Wǒ tīng bù dǒng Zhōngwén, kěyǐ shuō màn yìdiǎn ma?',
  },
  {
    id: 'mrt',
    category: 'transport',
    vi: 'Cho mình hỏi ga MRT ở đâu?',
    zh: '請問捷運站在哪裡？',
    romanization: 'Qǐngwèn jiéyùn zhàn zài nǎlǐ?',
  },
  {
    id: 'bus-destination',
    category: 'transport',
    vi: 'Xe buýt này có đi đến đây không?',
    zh: '請問這班公車有到這裡嗎？',
    romanization: 'Qǐngwèn zhè bān gōngchē yǒu dào zhèlǐ ma?',
    note: 'Mở bản đồ rồi chỉ vào điểm đến khi hỏi.',
  },
  {
    id: 'where-off',
    category: 'transport',
    vi: 'Mình nên xuống ở trạm nào?',
    zh: '我應該在哪一站下車？',
    romanization: 'Wǒ yīnggāi zài nǎ yí zhàn xiàchē?',
  },
  {
    id: 'missed-ride',
    category: 'transport',
    vi: 'Mình đã lỡ chuyến ban đầu. Chuyến tiếp theo đi thế nào?',
    zh: '我錯過了原本的車次，請問下一班怎麼搭？',
    romanization: 'Wǒ cuòguò le yuánběn de chēcì, qǐngwèn xià yì bān zěnme dā?',
  },
  {
    id: 'taxi-call',
    category: 'transport',
    vi: 'Vui lòng giúp mình gọi taxi, cảm ơn.',
    zh: '請幫我叫計程車，謝謝。',
    romanization: 'Qǐng bāng wǒ jiào jìchéngchē, xièxie.',
  },
  {
    id: 'taxi-address',
    category: 'transport',
    vi: 'Vui lòng đưa mình đến địa chỉ này, cảm ơn.',
    zh: '請帶我去這個地址，謝謝。',
    romanization: 'Qǐng dài wǒ qù zhège dìzhǐ, xièxie.',
  },
  {
    id: 'get-off-here',
    category: 'transport',
    vi: 'Mình xuống xe ở đây.',
    zh: '我要在這裡下車。',
    romanization: 'Wǒ yào zài zhèlǐ xiàchē.',
  },
  {
    id: 'no-spicy',
    category: 'food',
    vi: 'Vui lòng không cay.',
    zh: '請不要辣。',
    romanization: 'Qǐng bú yào là.',
  },
  {
    id: 'water',
    category: 'food',
    vi: 'Cho mình một ly nước, cảm ơn.',
    zh: '請給我一杯水，謝謝。',
    romanization: 'Qǐng gěi wǒ yì bēi shuǐ, xièxie.',
  },
  {
    id: 'english-menu',
    category: 'food',
    vi: 'Có thực đơn tiếng Anh không?',
    zh: '有英文菜單嗎？',
    romanization: 'Yǒu Yīngwén càidān ma?',
  },
  {
    id: 'help',
    category: 'help',
    vi: 'Bạn có thể giúp mình không?',
    zh: '可以幫我嗎？',
    romanization: 'Kěyǐ bāng wǒ ma?',
  },
  {
    id: 'hospital',
    category: 'help',
    vi: 'Mình cần đến bệnh viện.',
    zh: '我需要去醫院。',
    romanization: 'Wǒ xūyào qù yīyuàn.',
  },
  {
    id: 'police',
    category: 'help',
    vi: 'Vui lòng gọi cảnh sát giúp mình.',
    zh: '請幫我報警。',
    romanization: 'Qǐng bāng wǒ bàojǐng.',
  },
];

export const taxiDestinations: readonly TaxiDestination[] = [
  {
    id: 'muzik',
    nameVi: 'Khách sạn Muzik · Ximen',
    nameZh: '儷夏商旅－西門捷運館',
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
    addressZh: '台北市中正區鄭州路8號',
    addressEn: 'No. 8, Zhengzhou Rd., Zhongzheng Dist., Taipei',
    speech: '請帶我去桃園機場捷運A1台北車站，地址是台北市中正區鄭州路八號，謝謝。',
    romanization: 'Qǐng dài wǒ qù Táoyuán Jīchǎng Jiéyùn A1 Táiběi Chēzhàn. Dìzhǐ shì Táiběi Shì Zhōngzhèng Qū Zhèngzhōu Lù bā hào. Xièxie.',
    mapQuery: '桃園機場捷運 A1 台北車站 台北市中正區鄭州路8號',
  },
];
