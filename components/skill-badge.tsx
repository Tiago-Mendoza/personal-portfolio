import { Card, CardContent } from "@/components/ui/card"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <Card className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-primary cursor-default">
      <CardContent className="p-4">
        <div className="flex items-center justify-center min-h-[60px]">
          <h3 className="font-medium text-center">{name}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
