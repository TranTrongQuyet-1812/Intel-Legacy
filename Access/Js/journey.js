document.addEventListener('DOMContentLoaded', () => {
  const milestones = [
    {
      year: '1971',
      product: 'Intel 4004',
      era: 'Kỷ nguyên Khai sinh (1971–1982)',
      image: '../Access/Img/Journey_Data_image/Intel_4004.jpg',
      details: [
        'Sản phẩm: Intel 4004',
        'Intel 4004 ra mắt năm 1971, là bộ vi xử lý thương mại đầu tiên trên thế giới do Intel phát triển.',
        'Đây là CPU đầu tiên tích hợp toàn bộ bộ xử lý trên một con chip duy nhất, mở ra kỷ nguyên vi xử lý.',
        'Chip có kiến trúc 4-bit, khoảng 2.300 transistor, xung nhịp 740 kHz.',
        'Ban đầu dùng cho máy tính bỏ túi của Busicom nhưng nhanh chóng trở thành nền tảng cho máy tính hiện đại.',
        'Intel 4004 đặt nền móng cho các dòng CPU sau này và sự ra đời của PC, laptop và thiết bị số ngày nay.'
      ]
    },
    {
      year: '1972',
      product: 'Intel 8008',
      era: 'Kỷ nguyên Khai sinh (1971–1982)',
      image: '../Access/Img/Journey_Data_image/Intel_8008-1.jpg',
      details: [
        'Sản phẩm: Intel 8008',
        'Intel 8008 ra mắt năm 1972, là bộ vi xử lý 8-bit đầu tiên của Intel.',
        'Được phát triển ban đầu cho hãng máy tính Computer Terminal Corporation (sau này là Datapoint).',
        'Có khoảng 3.500 transistor, xung nhịp tối đa 800 kHz.',
        'Hỗ trợ bộ nhớ lớn hơn 4004, mạnh hơn và phù hợp cho máy tính mini.',
        'Đặt nền móng cho các CPU nổi tiếng sau này như Intel 8080 và sự phát triển của máy tính cá nhân.'
      ]
    },
    {
      year: '1974',
      product: 'Intel 8080',
      era: 'Kỷ nguyên Khai sinh (1971–1982)',
      image: '../Access/Img/Journey_Data_image/Intel_8080.jpg',
      details: [
        'Sản phẩm: Intel 8080',
        'Intel 8080 ra mắt năm 1974, là CPU 8-bit mạnh mẽ đầu tiên thật sự dùng cho máy tính cá nhân.',
        'Nhanh hơn Intel 8008 nhiều lần, có khoảng 6.000 transistor, xung nhịp tới 2 MHz.',
        'Trở thành bộ não của máy tính Altair 8800 — một trong những PC đầu tiên trên thế giới.',
        'Giúp khởi đầu phong trào máy tính cá nhân và cộng đồng lập trình viên hobbyist.',
        'Là nền tảng dẫn tới kiến trúc x86 và các CPU Intel hiện đại sau này.'
      ]
    },
    {
      year: '1978',
      product: 'Intel 8086',
      era: 'Kỷ nguyên Khai sinh (1971–1982)',
      image: '../Access/Img/Journey_Data_image/Intel_8086.jpg',
      details: [
        'Sản phẩm: Intel 8086',
        'Intel 8086 ra mắt năm 1978, là CPU 16-bit đầu tiên của Intel và khai sinh kiến trúc x86.',
        'Có khoảng 29.000 transistor, xung nhịp 5–10 MHz, hiệu năng vượt xa thế hệ 8-bit trước đó.',
        'Giới thiệu mô hình bộ nhớ phân đoạn (segmented memory), đặt nền tảng cho cách CPU PC hoạt động nhiều thập kỷ sau.',
        'Kiến trúc x86 từ 8086 trở thành tiêu chuẩn máy tính cá nhân và vẫn được dùng trong CPU hiện đại ngày nay.',
        'Là tiền đề cho các dòng CPU sau như Intel 80286, 80386 và toàn bộ hệ sinh thái PC.'
      ]
    },
    {
      year: '1982',
      product: 'Intel 80286',
      era: 'Kỷ nguyên Khai sinh (1971–1982)',
      image: '../Access/Img/Journey_Data_image/Intel_80268jpg.jpg',
      details: [
        'Sản phẩm: Intel 80286',
        'Intel 80286 ra mắt năm 1982, là thế hệ kế tiếp của Intel 8086 trong kiến trúc x86.',
        'Có khoảng 134.000 transistor, xung nhịp 6–25 MHz, hiệu năng cao hơn nhiều so với 8086.',
        'Giới thiệu Protected Mode, cho phép quản lý bộ nhớ và bảo vệ chương trình tốt hơn — bước tiến lớn cho hệ điều hành hiện đại.',
        'Được sử dụng trong máy tính IBM PC/AT, giúp PC trở thành tiêu chuẩn doanh nghiệp.',
        'Đặt nền móng cho CPU 32-bit và sự phát triển của các hệ điều hành đa nhiệm sau này.'
      ]
    },
    {
      year: '1985',
      product: 'Intel 80386',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/Intel_80386.jpg',
      details: [
        'Sản phẩm: Intel 80386',
        'Intel 80386 ra mắt năm 1985, mở ra kỷ nguyên CPU 32-bit cho máy tính cá nhân.',
        'Có khoảng 275.000 transistor, xung nhịp 12–40 MHz, hiệu năng vượt xa thế hệ 80286.',
        'Giới thiệu chế độ 32-bit thực sự và bộ nhớ ảo (virtual memory), cho phép chạy đa nhiệm hiện đại.',
        'Trở thành nền tảng cho các hệ điều hành như Microsoft Windows và Linux phát triển mạnh sau này.',
        'Định hình kiến trúc x86 hiện đại và ảnh hưởng trực tiếp tới CPU PC ngày nay.'
      ]
    },
    {
      year: '1989',
      product: 'Intel 80486',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/intel_80486.jpg',
      details: [
        'Sản phẩm: Intel 80486',
        'Intel 80486 ra mắt năm 1989, là thế hệ nâng cấp lớn của dòng 80386 trong kiến trúc x86.',
        'Tích hợp lần đầu FPU (bộ xử lý toán học) và cache L1 ngay trên CPU, giúp tăng hiệu năng đáng kể.',
        'Có khoảng 1,2 triệu transistor, xung nhịp từ 20–100 MHz.',
        'Giúp PC xử lý nhanh hơn nhiều trong đồ họa, CAD và phần mềm khoa học.',
        'Đánh dấu bước chuyển sang CPU tích hợp cao, mở đường cho dòng Intel Pentium sau này.'
      ]
    },
    {
      year: '1993',
      product: 'Intel Pentium',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/intel_pentium.jpg',
      details: [
        'Sản phẩm: Intel Pentium',
        'Intel Pentium ra mắt năm 1993, mở ra thời đại PC đại chúng và đưa máy tính cá nhân đến người dùng phổ thông.',
        'Là CPU x86 thế hệ thứ 5, kiến trúc superscalar cho phép xử lý nhiều lệnh cùng lúc.',
        'Có khoảng 3,1 triệu transistor, xung nhịp 60–300 MHz, hiệu năng tăng mạnh so với 80486.',
        'Giúp PC phổ biến rộng rãi trong gia đình, văn phòng và Internet thời kỳ đầu.',
        'Đặt nền móng cho các dòng Pentium II, III và sự bùng nổ máy tính cuối thập niên 1990.'
      ]
    },
    {
      year: '1995',
      product: 'Intel Pentium Pro',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/Intel_PentiumPro.jpg',
      details: [
        'Sản phẩm: Intel Pentium Pro',
        'Intel Pentium Pro ra mắt năm 1995, hướng tới máy trạm và máy chủ chuyên nghiệp.',
        'Giới thiệu kiến trúc P6, hỗ trợ thực thi ngoài thứ tự (out-of-order execution) giúp tăng hiệu năng lớn.',
        'Có khoảng 5,5 triệu transistor, tích hợp cache L2 tốc độ cao trong cùng package CPU.',
        'Tối ưu mạnh cho hệ điều hành 32-bit, đặc biệt là Windows NT.',
        'Trở thành nền tảng kiến trúc cho các CPU sau như Pentium II, Pentium III và nhiều thế hệ Intel hiện đại.'
      ]
    },
    {
      year: '1997',
      product: 'Intel Pentium II',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/Intel_PentiumII.jpg',
      details: [
        'Sản phẩm: Intel Pentium II',
        'Intel Pentium II ra mắt năm 1997, kế thừa kiến trúc P6 từ Pentium Pro nhưng hướng tới người dùng phổ thông.',
        'Kết hợp hiệu năng mạnh với hỗ trợ đa phương tiện MMX, giúp cải thiện game, video và ứng dụng đồ họa.',
        'Sử dụng thiết kế Slot 1 cartridge thay vì socket truyền thống — rất đặc trưng thời kỳ đó.',
        'Xung nhịp từ 233–450 MHz, giúp PC gia đình và Internet phát triển mạnh cuối thập niên 1990.',
        'Đặt nền móng cho các thế hệ tiếp theo như Pentium III và thời kỳ PC multimedia.'
      ]
    },
    {
      year: '1999',
      product: 'Intel Pentium III',
      era: 'Kỷ nguyên PC Đại chúng (1985–1999)',
      image: '../Access/Img/Journey_Data_image/intel_PentiumIII.jpg',
      details: [
        'Sản phẩm: Intel Pentium III',
        'Intel Pentium III ra mắt năm 1999, tập trung nâng cao hiệu năng cho Internet và đa phương tiện.',
        'Giới thiệu tập lệnh SSE (Streaming SIMD Extensions) giúp tăng tốc đồ họa 3D, video và xử lý hình ảnh.',
        'Xung nhịp từ 450 MHz đến hơn 1 GHz, đánh dấu thời kỳ CPU lần đầu vượt mốc 1 GHz.',
        'Được sử dụng rộng rãi trong PC gia đình, gaming và máy tính doanh nghiệp đầu những năm 2000.',
        'Là bước chuyển quan trọng trước khi Intel bước vào kiến trúc Pentium 4 và cuộc đua xung nhịp cao.'
      ]
    },
    {
      year: '2000',
      product: 'Intel Pentium 4',
      era: 'Cuộc đua Xung nhịp & Di động (2000–2006)',
      image: '../Access/Img/Journey_Data_image/Intel_Pentium4.jpg',
      details: [
        'Sản phẩm: Intel Pentium 4',
        'Intel Pentium 4 ra mắt năm 2000, mở đầu kỷ nguyên đua xung nhịp GHz của CPU.',
        'Sử dụng kiến trúc NetBurst, thiết kế pipeline rất dài để đạt xung nhịp cao.',
        'Tốc độ tăng từ 1.3 GHz lên tới hơn 3.8 GHz, cực kỳ ấn tượng thời điểm đó.',
        'Hỗ trợ SSE2/SSE3, cải thiện mạnh xử lý multimedia và video.',
        'Dù xung cao nhưng tiêu thụ điện lớn, dẫn đến việc Intel chuyển hướng sang kiến trúc Core sau này.'
      ]
    },
    {
      year: '2003',
      product: 'Intel Centrino',
      era: 'Cuộc đua Xung nhịp & Di động (2000–2006)',
      image: '../Access/Img/Journey_Data_image/Intel_Centrino.jpg',
      details: [
        'Sản phẩm: Intel Centrino',
        'Intel Centrino ra mắt năm 2003, là nền tảng laptop đầu tiên của Intel (không chỉ riêng CPU).',
        'Kết hợp CPU Pentium M + chipset + Wi-Fi tích hợp, giúp laptop mỏng nhẹ và tiết kiệm pin hơn nhiều.',
        'Đánh dấu lần đầu Wi-Fi trở thành tiêu chuẩn phổ biến trên máy tính xách tay.',
        'Tập trung hiệu năng trên mỗi watt thay vì chỉ tăng xung nhịp như thời Pentium 4.',
        'Mở ra kỷ nguyên laptop hiện đại và là tiền đề cho kiến trúc Intel Core sau này.'
      ]
    },
    {
      year: '2006',
      product: 'Intel Core 2 Duo',
      era: 'Cuộc đua Xung nhịp & Di động (2000–2006)',
      image: '../Access/Img/Journey_Data_image/Intel_Core2Duo.jpg',
      details: [
        'Sản phẩm: Intel Core 2 Duo',
        'Intel Core 2 Duo ra mắt năm 2006, đánh dấu cuộc lật đổ lớn của Intel sau thất bại hiệu suất/nhiệt của Pentium 4.',
        'Sử dụng kiến trúc Core microarchitecture, tập trung hiệu năng trên mỗi watt thay vì chỉ tăng xung nhịp.',
        'CPU 2 nhân (dual-core) phổ biến hóa đa nhiệm cho người dùng phổ thông.',
        'Hiệu năng cao hơn Pentium 4 nhưng tiết kiệm điện và mát hơn nhiều, giúp Intel vượt lại đối thủ AMD thời điểm đó.',
        'Trở thành nền tảng mở đầu cho toàn bộ dòng Intel Core i3/i5/i7 hiện đại sau này.'
      ]
    },
    {
      year: '2008',
      product: 'Intel Core i7-920 (Nehalem)',
      era: 'Kỷ nguyên Core i Series (2008–2015)',
      image: '../Access/Img/Journey_Data_image/Intel_Core-i7-920.jpg',
      details: [
        'Sản phẩm: Intel Core i7-920',
        'Intel Nehalem ra mắt năm 2008, mở đầu dòng Intel Core i Series (i3, i5, i7) hiện đại.',
        'Lần đầu tích hợp memory controller trực tiếp vào CPU, giảm độ trễ và tăng hiệu năng lớn.',
        'Giới thiệu công nghệ Hyper-Threading trở lại và Turbo Boost tự động tăng xung nhịp.',
        'Sử dụng kiến trúc mới thay thế hoàn toàn Core 2, cải thiện mạnh đa nhiệm và hiệu suất tổng thể.',
        'Đặt nền móng cho thiết kế CPU Intel hiện đại kéo dài hơn một thập kỷ sau đó.'
      ]
    },
    {
      year: '2011',
      product: 'Intel Sandy Bridge',
      era: 'Kỷ nguyên Core i Series (2008–2015)',
      image: '../Access/Img/Journey_Data_image/Intel_SandyBridge.jpg',
      details: [
        'Sản phẩm: Intel Sandy Bridge',
        'Intel Sandy Bridge ra mắt năm 2011, là thế hệ Core i Gen 2 với bước tiến lớn về hiệu năng và hiệu quả điện năng.',
        'Lần đầu tích hợp GPU và CPU trên cùng một die, cải thiện tốc độ và giảm điện năng tiêu thụ.',
        'Giới thiệu công nghệ Quick Sync Video, tăng tốc mã hóa video cực nhanh.',
        'Hiệu năng/giá thành rất tốt, trở thành một trong những thế hệ CPU thành công nhất của Intel.',
        'Đặt nền móng cho thiết kế CPU tích hợp (SoC-like) của PC hiện đại sau này.'
      ]
    },
    {
      year: '2015',
      product: 'Intel Skylake',
      era: 'Kỷ nguyên Core i Series (2008–2015)',
      image: '../Access/Img/Journey_Data_image/Intel_Skylake.jpg',
      details: [
        'Sản phẩm: Intel Skylake',
        'Intel Skylake ra mắt năm 2015, thuộc thế hệ Intel Core Gen 6, mang lại bước nâng cấp lớn về kiến trúc và hiệu suất.',
        'Hỗ trợ RAM DDR4 lần đầu trên nền tảng phổ thông, tăng băng thông và hiệu quả năng lượng.',
        'Cải thiện mạnh hiệu năng đồ họa tích hợp và tối ưu tiêu thụ điện cho cả desktop lẫn laptop.',
        'Giới thiệu nền tảng mới (socket LGA 1151) và hỗ trợ tốt Windows 10.',
        'Trở thành kiến trúc nền tảng được Intel tối ưu và tái sử dụng qua nhiều thế hệ CPU sau đó.'
      ]
    },
    {
      year: '2021',
      product: 'Intel Alder Lake',
      era: 'Kỷ nguyên Hybrid & AI PC (2021–2025)',
      image: '../Access/Img/Journey_Data_image/Intel_AlderLake.jpg',
      details: [
        'Sản phẩm: Intel Core i9-12900K',
        'Intel Alder Lake ra mắt năm 2021, mở đầu kỷ nguyên Hybrid CPU trên PC.',
        'Lần đầu kết hợp P-core (hiệu năng cao) và E-core (tiết kiệm điện) trên cùng một CPU, tương tự kiến trúc big.LITTLE.',
        'Giới thiệu Intel Thread Director, giúp hệ điều hành phân bổ tác vụ thông minh giữa các nhân.',
        'Hỗ trợ công nghệ mới như DDR5 và PCIe 5.0, nâng cấp lớn cho nền tảng PC hiện đại.',
        'Đánh dấu bước thay đổi kiến trúc quan trọng nhất của Intel kể từ thời Core i Series (Nehalem).'
      ]
    },
    {
      year: '2023',
      product: 'Intel Meteor Lake',
      era: 'Kỷ nguyên Hybrid & AI PC (2021–2025)',
      image: '../Access/Img/Journey_Data_image/Intel_CoreUltra.jpg',
      details: [
        'Sản phẩm: Intel Core Ultra',
        'Intel Meteor Lake ra mắt năm 2023, mở đầu dòng Core Ultra với thiết kế chiplet (tile-based) đầu tiên của Intel cho PC.',
        'Sử dụng công nghệ đóng gói Foveros 3D, tách CPU, GPU và SoC thành nhiều tile riêng để tối ưu hiệu năng và điện năng.',
        'Lần đầu tích hợp NPU (AI accelerator) chuyên xử lý tác vụ AI ngay trên máy tính cá nhân.',
        'Cải thiện mạnh hiệu suất/điện năng cho laptop mỏng nhẹ và AI PC thế hệ mới.',
        'Đánh dấu bước chuyển của Intel sang kỷ nguyên AI PC và kiến trúc mô-đun hiện đại.'
      ]
    },
    {
      year: '2024–2025',
      product: 'Intel Lunar Lake',
      era: 'Kỷ nguyên Hybrid & AI PC (2021–2025)',
      image: '../Access/Img/Journey_Data_image/Intel_Lunar_Lake.png',
      details: [
        'Sản phẩm: Intel Lunar Lake',
        'Intel Lunar Lake ra mắt năm 2024, tập trung vào kỷ nguyên AI Efficiency cho laptop thế hệ mới.',
        'Thiết kế tối ưu điện năng mạnh mẽ, hướng tới AI PC siêu tiết kiệm pin và hiệu suất trên mỗi watt cao.',
        'Nâng cấp NPU AI mạnh hơn nhiều, xử lý tốt các tác vụ AI chạy trực tiếp trên thiết bị (on-device AI).',
        'Tích hợp RAM ngay trong package giúp giảm độ trễ và tiết kiệm điện năng.',
        'Đánh dấu bước chuyển từ “CPU mạnh” sang máy tính tối ưu AI + thời lượng pin + hiệu quả năng lượng.'
      ]
    }
  ];

  const cardTrack = document.getElementById('cardTrack');
  const eraBadge = document.getElementById('eraBadge');
  const journeySection = document.getElementById('journey');
  let maxTranslate = 0;

  function renderCards() {
    const cardMarkup = milestones.map((item, idx) => {
      const delay = (idx % 4) * 60;
      return `
        <article class="milestone-card flex-shrink-0" data-era="${item.era}" data-year="${item.year}">
          <div class="glass-shell hardcore-glass rounded-2xl border border-white/10 p-[clamp(12px,2.5vh,24px)] relative overflow-hidden flex flex-col justify-between h-auto max-h-[88vh]" style="transition-delay:${delay}ms;">
            <div class="flex items-baseline justify-between mb-[clamp(8px,2vh,16px)] shrink-0">
              <div class="font-black text-white tracking-tight drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)] text-[clamp(24px,5vh,48px)] leading-none">${item.year}</div>
              <span class="text-[clamp(10px,1.2vh,12px)] tracking-[0.08em] uppercase text-intelCyan font-semibold whitespace-nowrap leading-tight">${item.product}</span>
            </div>
            <div class="rounded-xl border border-white/10 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-[clamp(6px,1vh,12px)] mb-[clamp(8px,2vh,16px)] shrink w-full">
              <div class="relative h-[clamp(80px,18vh,208px)] overflow-hidden rounded-lg w-full">
                <img src="${item.image}" alt="${item.product}" class="chip-img w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
            <div class="milestone-detail shrink-0">
              <div class="uppercase tracking-[0.2em] text-intelCyan font-semibold text-[clamp(10px,1.2vh,12px)] leading-none">Thông tin kỹ thuật</div>
              <ul class="mt-[clamp(6px,1.5vh,12px)] flex flex-col gap-[clamp(4px,0.8vh,8px)] text-[clamp(11px,1.4vh,14px)] leading-[clamp(15px,1.9vh,24px)] text-slate-100 font-mono">
                ${item.details.map(line => `<li class="flex items-start"><span class="mr-[clamp(4px,0.5vh,8px)] mt-[0.1em] text-[clamp(8px,1vh,12px)]">▪</span><span class="flex-1">${line}</span></li>`).join('')}
              </ul>
            </div>
          </div>
        </article>
      `;
    }).join('');

    cardTrack.innerHTML = cardMarkup;
    applyTrackPadding();
    requestAnimationFrame(() => {
      computeMaxTranslate();
      updateJourneyHeight();
      handleScroll();
    });
  }

  function applyTrackPadding() {
    const firstCard = cardTrack.querySelector('.milestone-card');
    if (!firstCard) return;
    const cardWidth = firstCard.getBoundingClientRect().width || 320;
    const sidePadding = Math.max((window.innerWidth - cardWidth) / 2, 18);
    cardTrack.style.paddingLeft = `${sidePadding}px`;
    cardTrack.style.paddingRight = `${sidePadding}px`;
  }

  function computeMaxTranslate() {
    const cards = cardTrack.querySelectorAll('.milestone-card');
    if (!cards.length) {
      maxTranslate = 0;
      return;
    }
    const lastCard = cards[cards.length - 1];
    const lastCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
    maxTranslate = Math.max(lastCenter - window.innerWidth / 2, 0);
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function lerp(start, end, amt) {
    return start + (end - start) * amt;
  }

  let targetX = 0;
  let currentX = 0;
  let ticking = false;

  function updateFocusStates() {
    const cards = Array.from(cardTrack.querySelectorAll('.milestone-card'));
    const viewportCenter = window.innerWidth / 2;
    let bestCard = null;
    let bestFocus = -Infinity;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      const focusRange = 320;
      const focus = clamp(1 - dist / focusRange, 0, 1);

      const scale = lerp(1, 1.25, focus);
      const opacity = lerp(0.4, 1, focus);
      card.style.transform = `scale(${scale}) translateZ(0)`;
      card.style.opacity = opacity;

      const detail = card.querySelector('.milestone-detail');
      detail.style.opacity = focus;
      detail.style.transform = `translateY(${50 - focus * 50}px)`;

      const shell = card.querySelector('.glass-shell');
      const glow = focus * 0.45 + 0.2;
      shell.style.boxShadow = `0 8px 32px rgba(0,0,0,0.8), 0 0 ${28 + focus * 24}px rgba(0, 242, 255, ${glow})`;
      shell.style.borderColor = `rgba(0, 242, 255, ${0.12 + focus * 0.35})`;
      shell.style.transform = 'translateZ(0)';

      if (focus > bestFocus) {
        bestFocus = focus;
        bestCard = card;
      }
    });

    if (bestCard) {
      eraBadge.textContent = bestCard.dataset.era;
    }
  }

  function updateMotion() {
    currentX = lerp(currentX, targetX, 0.1);
    if (Math.abs(currentX - targetX) < 0.5) {
      currentX = targetX;
    }
    cardTrack.style.transform = `translateX(${currentX}px)`;
    updateFocusStates();

    if (currentX !== targetX) {
      requestAnimationFrame(updateMotion);
    } else {
      ticking = false;
    }
  }

  function handleScroll() {
    const sectionTop = journeySection.offsetTop;
    const sectionHeight = journeySection.offsetHeight - window.innerHeight;
    const progress = clamp((window.scrollY - sectionTop) / sectionHeight, 0, 1);
    targetX = -progress * maxTranslate;

    if (!ticking) {
      ticking = true;
      requestAnimationFrame(updateMotion);
    }

    // Show footer only when scrolled into the card area (past the hero)
    const footer = document.querySelector('.global-footer');
    if (footer) {
      if (window.scrollY >= sectionTop) {
        footer.classList.add('visible');
      } else {
        footer.classList.remove('visible');
      }
    }
  }

  function handleResize() {
    applyTrackPadding();
    computeMaxTranslate();
    updateJourneyHeight();
    currentX = 0;
    targetX = 0;
    cardTrack.style.transform = 'translateX(0px)';
    requestAnimationFrame(handleScroll);
  }

  function updateJourneyHeight() {
    const needed = maxTranslate + window.innerHeight * 2;
    journeySection.style.height = `${needed}px`;
  }

  renderCards();
  updateFocusStates();
  handleScroll();

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleResize);
  window.addEventListener('load', () => {
    computeMaxTranslate();
    updateJourneyHeight();
    handleScroll();
  });
});
