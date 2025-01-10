import type { FileRejection } from "react-dropzone";
import {
  FaFile,
  FaFileCsv,
  FaFileExcel,
  FaFileImage,
  FaFileLines,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileVideo,
  FaFileWord,
} from "react-icons/fa6";

export const DEFAULT_ICON = FaFile;

export const FileTypes = [
  {
    name: "Excel",
    validExtensions: ["xlsx"],
    icon: FaFileExcel,
    themeColor: "green",
  },
  {
    name: "Word",
    validExtensions: ["doc", "docx"],
    icon: FaFileWord,
    themeColor: "blue",
  },
  {
    name: "PDF",
    validExtensions: ["pdf"],
    icon: FaFilePdf,
    themeColor: "red",
  },
  {
    name: "Image",
    validExtensions: ["png", "jpg", "jpeg"],
    icon: FaFileImage,
    themeColor: "yellow",
  },
  {
    name: "Text",
    validExtensions: ["txt"],
    icon: FaFileLines,
    themeColor: "purple",
  },
  {
    name: "Csv",
    validExtensions: ["csv"],
    icon: FaFileCsv,
    themeColor: "green",
  },
  {
    name: "PowerPoint",
    validExtensions: ["pptx"],
    icon: FaFilePowerpoint,
    themeColor: "yellow",
  },
  {
    name: "Video",
    validExtensions: ["mp4"],
    icon: FaFileVideo,
    themeColor: "blue",
  },
  {
    name: "Other",
    validExtensions: ["*"],
    icon: DEFAULT_ICON,
    themeColor: "gray",
  },
];

export const getFileType = (file: File) => {
  if (!file || !file.name)
    return FileTypes.find((type) => type.name === "Other");

  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

  return (
    FileTypes.find((type) => type.validExtensions.includes(fileExtension)) ||
    FileTypes.find((type) => type.name === "Other")
  );
};



const mimeTypeMap = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": [
    ".pptx",
  ],
  "text/plain": [".txt"],
  "text/csv": [".csv"],
  "text/html": [".html", ".htm"],
  "video/mp4": [".mp4"],
} as const;

export type MimeType = keyof typeof mimeTypeMap;
export type FileExtension = (typeof mimeTypeMap)[MimeType][number];

export const getMimeTypeMapping = (
  allowedExtensions?: FileExtension[]
): Partial<Record<MimeType, FileExtension[]>> => {
  if (!allowedExtensions) return {};
  const result: Partial<Record<MimeType, FileExtension[]>> = {};

  // Iterate over the mimeTypeMap and filter based on allowed extensions
  for (const [mimeType, extensions] of Object.entries(mimeTypeMap)) {
    const matchedExtensions = extensions.filter((ext) =>
      allowedExtensions.includes(ext)
    );

    if (matchedExtensions.length > 0) {
      result[mimeType as MimeType] = matchedExtensions;
    }
  }

  return result;
};


export const getMimeTypes = (
  allowedExtensions?: FileExtension[]
): MimeType[] => {
  if (!allowedExtensions) return []
  const result: MimeType[] = []

  // Iterate over the mimeTypeMap and filter based on allowed extensions
  for (const [mimeType, extensions] of Object.entries(mimeTypeMap)) {
    const matchedExtensions = extensions.filter((ext) =>
      allowedExtensions.includes(ext)
    );

    if (matchedExtensions.length > 0) {
      result.push(mimeType as MimeType)
    }
  }

  return result;
};


export const getReactDropZoneErrorMessages = (
  error?: Readonly<FileRejection[]>
) => {
  if (!error) return [];

  const errors = error.flatMap((filesError) => {
    if (filesError.errors.length === 0) return [];
    return filesError.errors.map((e) => e.message);
  });

  return errors;
};

const multiplier = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4,
  PB: 1024 ** 5,
  EB: 1024 ** 6,
  ZB: 1024 ** 7,
  YB: 1024 ** 8,
} as const;

const units = Object.keys(multiplier) as (keyof typeof multiplier)[];

export const getFormattedFileSize = (size: number): string => {
  if (!size || size === 0 || Number.isNaN(size)) return "0 B";

  // If size exceeds YB, use YB as the unit
  if (size >= 1024 ** (units.length - 1)) {
    const formattedSize = size / 1024 ** (units.length - 1);
    return `${formattedSize.toFixed(1).replace(/\.0$/, "")} YB`;
  }

  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  const formattedSize = size / 1024 ** unitIndex;

  return `${formattedSize
    .toFixed(formattedSize < 10 ? 2 : 1)
    .replace(/\.0$/, "")} ${units[unitIndex]}`;
};

export const convertMetricsToBytes = (
  value: number,
  metrics: keyof typeof multiplier
): number => {
  const unitMultiplier = multiplier[metrics];
  return value * unitMultiplier;
};
