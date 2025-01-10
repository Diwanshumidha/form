'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from './card'

interface AnimatedCardProps {
  children: React.ReactNode
}

export function AnimatedCard({ children }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card border-border">
        <CardContent className="p-4">{children}</CardContent>
      </Card>
    </motion.div>
  )
}

