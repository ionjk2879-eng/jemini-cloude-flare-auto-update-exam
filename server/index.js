import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Setup storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads/');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Waste Guide Data Mapping (Matching Frontend items)
const wasteDatabase = [
  {
    keywords: ['소파', '의자', '가구', 'sofa', 'chair'],
    name: '3인용 가죽 소파',
    price: '10,000',
    category: '가구류',
    sizeTag: '대형 폐기물',
    guideItem: '소파 (3인용)',
    description: '부피가 큰 대형 가구로 분류됩니다. 지자체 대형폐기물 스티커 부착이 필수입니다.'
  },
  {
    keywords: ['냉장고', '세탁기', '가전', 'fridge', 'refrigerator'],
    name: '대형 양문형 냉장고',
    price: '무료',
    category: '가전류',
    sizeTag: '대형 폐기물 (무상수거)',
    guideItem: '대형 가전 (냉장고 등)',
    description: '대형 가전은 폐가전 무상방문수거 서비스를 통해 비용 없이 배출할 수 있습니다.'
  },
  {
    keywords: ['장롱', '옷장', '가구', 'closet', 'wardrobe'],
    name: '목재 장롱 (1자)',
    price: '3,000',
    category: '가구류',
    sizeTag: '중형 폐기물',
    guideItem: '장롱 (1자 기준)',
    description: '크기에 따라 비용이 산정되는 중대형 가구입니다. 분해 배출 시 수거가 더 원활합니다.'
  },
  {
    keywords: ['면도날', '칼', '칼날', 'razor', 'blade'],
    name: '면도날/칼날',
    price: '무료',
    category: '생활/위험류',
    sizeTag: '일반 쓰레기 (위험)',
    guideItem: '면도날/칼날',
    description: '날카로운 위험 물품입니다. 종이에 싸서 안전하게 일반 종량제 봉투에 버려야 합니다.'
  },
  {
    keywords: ['건전지', '배터리', 'battery'],
    name: '폐건전지',
    price: '무료',
    category: '생활/위험류',
    sizeTag: '분리배출 대상',
    guideItem: '폐건전지',
    description: '화재 위험이 있는 품목입니다. 반드시 전용 수거함에 배출해 주세요.'
  },
  {
    keywords: ['약', '의약품', 'medicine', 'pill'],
    name: '폐의약품',
    price: '무료',
    category: '생활/위험류',
    sizeTag: '분리배출 대상',
    guideItem: '폐의약품',
    description: '환경 오염을 방지하기 위해 약국이나 보건소 수거함에 버려야 합니다.'
  }
];

// AI Analysis Simulation Logic
function analyzeImage(filename) {
  const lowercaseFile = filename.toLowerCase();
  
  // Simple keyword matching based on filename as a mock for real AI Vision
  for (const item of wasteDatabase) {
    if (item.keywords.some(keyword => lowercaseFile.includes(keyword))) {
      return item;
    }
  }
  
  // Default to a generic result if no match found
  return {
    name: '기타 폐기물',
    price: '별도 문의',
    category: '기타',
    sizeTag: '분류 필요',
    guideItem: '',
    description: 'AI가 정확한 품목을 판별하지 못했습니다. 상세 가이드를 확인하거나 사진 상담을 다시 시도해 주세요.'
  };
}

app.post('/api/analyze', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '이미지 파일이 없습니다.' });
  }

  console.log(`Analyzing image: ${req.file.originalname}`);

  // Simulate processing time
  setTimeout(() => {
    // In a real app, you would pass the image buffer/path to an AI model here
    const result = analyzeImage(req.file.originalname);
    res.json(result);
  }, 2000);
});

app.listen(PORT, () => {
  console.log(`Analysis Server running on http://localhost:${PORT}`);
});
