"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedCard } from "../ui/animatedCard";

interface GitHubPreviewProps {
  avatar_url: string;
  login: string;
  bio: string;
}

export function GitHubPreview({ avatar_url, login, bio }: GitHubPreviewProps) {
  return (
    <AnimatedCard>
      <div className="flex items-start gap-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Image
            src={avatar_url}
            alt="GitHub Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
        </motion.div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{login}</span>
          </div>
          {bio && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground"
            >
              {bio}
            </motion.p>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}
