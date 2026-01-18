import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SkillBadgeProps {
  name: string
  level: number
}

export default function SkillBadge({ name, level }: SkillBadgeProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">{name}</h3>
            <span className="text-sm text-muted-foreground">{level}%</span>
          </div>
          <Progress value={level} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}
