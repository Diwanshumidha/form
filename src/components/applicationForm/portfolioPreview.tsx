"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { AnimatedCard } from "../ui/animatedCard";

interface PortfolioPreviewProps {
  title: string;
  description: string;
  image: string;
}

export function PortfolioPreview({
  title,
  description,
  image,
}: PortfolioPreviewProps) {
  return (
    <AnimatedCard>
      <div className="space-y-4">
        {image && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-video overflow-hidden rounded-lg"
          >
            <img
              src={image}
              alt="Portfolio Preview"
              className="object-cover"
            />
          </motion.div>
        )}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </motion.div>
      </div>
    </AnimatedCard>
  );
}
