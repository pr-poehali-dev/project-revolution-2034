import { useState } from "react";

const langs = ["ru", "en", "hi"] as const;
type Lang = (typeof langs)[number];

const langLabels: Record<Lang, string> = {
  ru: "РУС",
  en: "ENG",
  hi: "हिन्दी",
};

const content: Record<Lang, {
  date: string;
  to: string;
  toName: string;
  from: string;
  fromName: string;
  subject: string;
  greeting: string;
  intro: string;
  productTitle: string;
  product: string;
  productDesc: string;
  priceTitle: string;
  price: string;
  priceNote: string;
  qualityTitle: string;
  quality: string[];
  termsTitle: string;
  terms: string[];
  whyTitle: string;
  why: string[];
  cta: string;
  contactTitle: string;
  company: string;
  phone: string;
  email: string;
  closing: string;
  stamp: string;
}> = {
  ru: {
    date: "28 мая 2026 г.",
    to: "Кому:",
    toName: "Finolex Cables Ltd\nМумбаи, Индия",
    from: "От:",
    fromName: "ООО «РЕАЛ ГРУПП»\nРоссийская Федерация",
    subject: "КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ\nЭкспорт медной катанки из России в Индию",
    greeting: "Уважаемые коллеги,",
    intro:
      "ООО «РЕАЛ ГРУПП» предлагает вашей компании Finolex Cables Ltd — одному из ведущих производителей кабельно-проводниковой продукции в Индии — установить долгосрочное партнёрство по поставкам медной катанки российского производства.",
    productTitle: "Предмет поставки",
    product: "Медная катанка (Cu-ETP, 8 мм)",
    productDesc:
      "Высококачественная медная катанка марки Cu-ETP диаметром 8 мм, произведённая на российских металлургических предприятиях. Является основным сырьём для производства электрических кабелей и проводов.",
    priceTitle: "Ценовые условия",
    price: "Цена ниже котировок Лондонской биржи металлов (LME)",
    priceNote:
      "Мы предлагаем конкурентную цену с дисконтом относительно актуальных котировок LME. Окончательная цена фиксируется в контракте на основе котировок LME на дату отгрузки. Валюта расчётов: USD / EUR / CNY — по договорённости.",
    qualityTitle: "Качество и соответствие",
    quality: [
      "Чистота меди — не менее 99,9%",
      "Соответствие стандартам ГОСТ, EN 1977, ASTM B49",
      "Сертификаты качества на каждую партию",
      "Возможен независимый инспекционный контроль",
    ],
    termsTitle: "Условия поставки",
    terms: [
      "Базис поставки: CIF Mumbai / CFR Mumbai (Incoterms 2020)",
      "Объём: от 500 тонн в месяц, возможно увеличение",
      "Упаковка: бухты на деревянных катушках",
      "Срок поставки: 30–45 дней с момента подписания контракта",
      "Форма оплаты: аккредитив (L/C), предоплата — по договорённости",
    ],
    whyTitle: "Почему выгодно сотрудничать с нами",
    why: [
      "Цена ниже рыночных котировок LME — прямая экономия на сырье",
      "Надёжная логистическая цепочка Россия → Индия",
      "Гибкие условия контракта и объёмы под ваши потребности",
      "Полный пакет экспортной и таможенной документации",
      "Долгосрочное партнёрство с фиксированными условиями",
    ],
    cta: "Мы готовы предоставить образцы продукции, сертификаты качества и детальный расчёт цены. Приглашаем к переговорам в удобном для вас формате.",
    contactTitle: "Контактная информация",
    company: "ООО «РЕАЛ ГРУПП»",
    phone: "+7 933 000 07 02",
    email: "real.group2020@mail.ru",
    closing: "С уважением и готовностью к сотрудничеству,\nРуководство ООО «РЕАЛ ГРУПП»",
    stamp: "М.П.",
  },
  en: {
    date: "May 28, 2026",
    to: "To:",
    toName: "Finolex Cables Ltd\nMumbai, India",
    from: "From:",
    fromName: "Real Group LLC\nRussian Federation",
    subject: "COMMERCIAL OFFER\nExport of Copper Rod from Russia to India",
    greeting: "Dear Colleagues,",
    intro:
      "Real Group LLC is pleased to offer Finolex Cables Ltd — one of India's leading manufacturers of cable and wire products — a long-term partnership for the supply of copper rod of Russian production.",
    productTitle: "Product",
    product: "Copper Rod (Cu-ETP, 8 mm)",
    productDesc:
      "High-quality Cu-ETP copper rod, 8 mm in diameter, produced at Russian metallurgical plants. It is the primary raw material for the manufacture of electrical cables and wires.",
    priceTitle: "Pricing Terms",
    price: "Price below London Metal Exchange (LME) quotations",
    priceNote:
      "We offer a competitive price with a discount relative to current LME quotations. The final price is fixed in the contract based on LME quotations on the date of shipment. Settlement currency: USD / EUR / CNY — to be agreed.",
    qualityTitle: "Quality & Compliance",
    quality: [
      "Copper purity — min. 99.9%",
      "Compliance with GOST, EN 1977, ASTM B49 standards",
      "Quality certificates for each batch",
      "Independent inspection control available",
    ],
    termsTitle: "Delivery Terms",
    terms: [
      "Delivery basis: CIF Mumbai / CFR Mumbai (Incoterms 2020)",
      "Volume: from 500 MT per month, scalable",
      "Packaging: coils on wooden spools",
      "Lead time: 30–45 days from contract signing",
      "Payment: Letter of Credit (L/C), prepayment — to be agreed",
    ],
    whyTitle: "Why Partner With Us",
    why: [
      "Price below LME market quotations — direct savings on raw materials",
      "Reliable logistics chain Russia → India",
      "Flexible contract terms and volumes tailored to your needs",
      "Full export and customs documentation package",
      "Long-term partnership with fixed conditions",
    ],
    cta: "We are ready to provide product samples, quality certificates, and a detailed price calculation. We look forward to negotiations in a format convenient for you.",
    contactTitle: "Contact Information",
    company: "Real Group LLC",
    phone: "+7 933 000 07 02",
    email: "real.group2020@mail.ru",
    closing: "Sincerely and ready for cooperation,\nManagement of Real Group LLC",
    stamp: "Seal",
  },
  hi: {
    date: "28 मई 2026",
    to: "प्रति:",
    toName: "फिनोलेक्स केबल्स लिमिटेड\nमुंबई, भारत",
    from: "प्रेषक:",
    fromName: "रियल ग्रुप एलएलसी\nरूसी संघ",
    subject: "वाणिज्यिक प्रस्ताव\nरूस से भारत को तांबे की कड़ी (Copper Rod) का निर्यात",
    greeting: "आदरणीय महोदय/महोदया,",
    intro:
      "रियल ग्रुप एलएलसी, फिनोलेक्स केबल्स लिमिटेड — भारत के अग्रणी केबल एवं तार उत्पादकों में से एक — को रूसी उत्पादन की तांबे की कड़ी (Copper Rod) की आपूर्ति के लिए दीर्घकालिक साझेदारी का प्रस्ताव प्रस्तुत करता है।",
    productTitle: "आपूर्ति का विषय",
    product: "तांबे की कड़ी (Cu-ETP, 8 मिमी)",
    productDesc:
      "Cu-ETP ग्रेड की उच्च गुणवत्ता वाली तांबे की कड़ी, व्यास 8 मिमी, रूसी धातुकर्म संयंत्रों में उत्पादित। यह विद्युत केबल और तारों के निर्माण के लिए प्राथमिक कच्चा माल है।",
    priceTitle: "मूल्य निर्धारण शर्तें",
    price: "लंदन मेटल एक्सचेंज (LME) के भाव से कम कीमत",
    priceNote:
      "हम वर्तमान LME कोटेशन की तुलना में छूट के साथ प्रतिस्पर्धी मूल्य प्रदान करते हैं। अंतिम मूल्य शिपमेंट की तिथि पर LME कोटेशन के आधार पर अनुबंध में निर्धारित किया जाता है। भुगतान मुद्रा: USD / EUR / CNY — सहमति से।",
    qualityTitle: "गुणवत्ता एवं अनुपालन",
    quality: [
      "तांबे की शुद्धता — न्यूनतम 99.9%",
      "GOST, EN 1977, ASTM B49 मानकों के अनुरूप",
      "प्रत्येक खेप के लिए गुणवत्ता प्रमाण पत्र",
      "स्वतंत्र निरीक्षण नियंत्रण उपलब्ध",
    ],
    termsTitle: "डिलीवरी शर्तें",
    terms: [
      "डिलीवरी आधार: CIF मुंबई / CFR मुंबई (Incoterms 2020)",
      "मात्रा: प्रति माह 500 मीट्रिक टन से, वृद्धि संभव",
      "पैकेजिंग: लकड़ी के स्पूल पर कॉइल",
      "लीड टाइम: अनुबंध हस्ताक्षर से 30–45 दिन",
      "भुगतान: साख पत्र (L/C), अग्रिम भुगतान — सहमति से",
    ],
    whyTitle: "हमारे साथ साझेदारी क्यों लाभदायक है",
    why: [
      "LME बाजार कोटेशन से कम कीमत — कच्चे माल पर सीधी बचत",
      "रूस → भारत विश्वसनीय लॉजिस्टिक्स श्रृंखला",
      "आपकी जरूरतों के अनुसार लचीली अनुबंध शर्तें और मात्रा",
      "पूर्ण निर्यात और सीमा शुल्क दस्तावेज़ीकरण पैकेज",
      "निश्चित शर्तों के साथ दीर्घकालिक साझेदारी",
    ],
    cta: "हम उत्पाद के नमूने, गुणवत्ता प्रमाण पत्र और विस्तृत मूल्य गणना प्रदान करने के लिए तैयार हैं। हम आपके लिए सुविधाजनक प्रारूप में वार्ता के लिए आमंत्रित करते हैं।",
    contactTitle: "संपर्क जानकारी",
    company: "रियल ग्रुप एलएलसी",
    phone: "+7 933 000 07 02",
    email: "real.group2020@mail.ru",
    closing: "सादर एवं सहयोग की तत्परता के साथ,\nरियल ग्रुप एलएलसी का प्रबंधन",
    stamp: "मुहर",
  },
};

export default function KP() {
  const [lang, setLang] = useState<Lang>("ru");
  const c = content[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900 print:bg-white">
      {/* Lang switcher */}
      <div className="flex justify-center gap-2 py-4 bg-gray-50 border-b print:hidden">
        {langs.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
              lang === l
                ? "bg-yellow-500 text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {langLabels[l]}
          </button>
        ))}
        <button
          onClick={() => window.print()}
          className="ml-4 px-4 py-2 rounded font-medium text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          🖨 Печать / Print
        </button>
      </div>

      {/* Document */}
      <div className="max-w-3xl mx-auto px-8 py-10 print:px-6 print:py-8">

        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
          <div>
            <div className="text-2xl font-bold text-gray-900 tracking-wide">РЕАЛ ГРУПП</div>
            <div className="text-sm text-gray-500 mt-1">REAL GROUP LLC</div>
          </div>
          <div className="text-right text-sm text-gray-500">
            <div>{c.date}</div>
            <div className="mt-1">{c.email}</div>
            <div>{c.phone}</div>
          </div>
        </div>

        {/* To / From */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{c.to}</div>
            <div className="text-sm font-medium text-gray-800 whitespace-pre-line">{c.toName}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="text-xs font-semibold text-gray-400 uppercase mb-1">{c.from}</div>
            <div className="text-sm font-medium text-gray-800 whitespace-pre-line">{c.fromName}</div>
          </div>
        </div>

        {/* Subject */}
        <div className="text-center mb-10">
          <div className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg">
            <div className="text-xs font-semibold uppercase tracking-widest opacity-80 whitespace-pre-line leading-relaxed text-center">
              {c.subject}
            </div>
          </div>
        </div>

        {/* Greeting */}
        <p className="text-gray-700 mb-3 font-medium">{c.greeting}</p>
        <p className="text-gray-700 mb-8 leading-relaxed">{c.intro}</p>

        {/* Product */}
        <Section title={c.productTitle}>
          <div className="font-semibold text-gray-900 mb-2">{c.product}</div>
          <p className="text-gray-600 leading-relaxed">{c.productDesc}</p>
        </Section>

        {/* Price */}
        <Section title={c.priceTitle}>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 pl-4 py-2 mb-3 font-semibold text-gray-900">
            {c.price}
          </div>
          <p className="text-gray-600 leading-relaxed">{c.priceNote}</p>
        </Section>

        {/* Quality */}
        <Section title={c.qualityTitle}>
          <ul className="space-y-2">
            {c.quality.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-yellow-500 font-bold mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Terms */}
        <Section title={c.termsTitle}>
          <ul className="space-y-2">
            {c.terms.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-gray-400 font-bold mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* Why */}
        <Section title={c.whyTitle}>
          <ul className="space-y-2">
            {c.why.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700">
                <span className="text-yellow-500 font-bold mt-0.5">★</span>
                {item}
              </li>
            ))}
          </ul>
        </Section>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-xl p-6 mb-8">
          <p className="leading-relaxed text-gray-200">{c.cta}</p>
        </div>

        {/* Contacts */}
        <Section title={c.contactTitle}>
          <div className="grid grid-cols-1 gap-2 text-gray-700">
            <div><span className="font-semibold">{c.company}</span></div>
            <div>📞 {c.phone}</div>
            <div>✉️ {c.email}</div>
          </div>
        </Section>

        {/* Closing */}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-700 whitespace-pre-line mb-16">{c.closing}</p>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-sm text-gray-400">________________</div>
              <div className="text-xs text-gray-400 mt-1">{c.stamp}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">________________</div>
              <div className="text-xs text-gray-400 mt-1">подпись / signature</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <h2 className="text-base font-bold text-gray-900 uppercase tracking-wide mb-3 pb-1 border-b border-gray-200">
        {title}
      </h2>
      {children}
    </div>
  );
}
