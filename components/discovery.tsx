import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Languages, Bed, Gift, FileText, Users, MessageCircle, Info, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const helperCategories = [
  { name: "All", icon: Globe, color: "text-gray-500" },
  { name: "Welcome", icon: Home, color: "text-blue-500" },
  { name: "Language", icon: Languages, color: "text-green-500" },
  { name: "Hosting", icon: Bed, color: "text-yellow-500" },
  { name: "Free Items", icon: Gift, color: "text-purple-500" },
  { name: "Resume", icon: FileText, color: "text-red-500" },
  { name: "Network", icon: Users, color: "text-indigo-500" },
]

const helpers = [
  { name: "Emma Wilson", category: "Welcome", description: "Local guide from Toronto, Ontario", avatar: "https://i.pravatar.cc/150?img=1", remote: false },
  { name: "Liam Chen", category: "Language", description: "Translator from Vancouver, British Columbia", avatar: "https://i.pravatar.cc/150?img=2", remote: true },
  { name: "Sofia Rodriguez", category: "Hosting", description: "Host from Montreal, Quebec", avatar: "https://i.pravatar.cc/150?img=3", remote: false },
  { name: "Ahmed Hassan", category: "Free Items", description: "Donor from Calgary, Alberta", avatar: "https://i.pravatar.cc/150?img=4", remote: true },
  { name: "Maria Kovač", category: "Resume", description: "HR professional from Ottawa, Ontario", avatar: "https://i.pravatar.cc/150?img=5", remote: true },
  { name: "Yuki Tanaka", category: "Network", description: "Community organizer from Halifax, Nova Scotia", avatar: "https://i.pravatar.cc/150?img=6", remote: false },
  { name: "Omar Farah", category: "Welcome", description: "Cultural liaison from Edmonton, Alberta", avatar: "https://i.pravatar.cc/150?img=7", remote: true },
  { name: "Aisha Patel", category: "Language", description: "ESL teacher from Winnipeg, Manitoba", avatar: "https://i.pravatar.cc/150?img=8", remote: true },
]

export default function Discovery() {
  return (

        <Tabs defaultValue="All" className="w-full">
          <ScrollArea className="w-full whitespace-nowrap rounded-md border bg-muted">
            <TabsList className="inline-flex h-12 items-center justify-center rounded-md  p-1 text-muted-foreground">
              {helperCategories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name} 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  <category.icon className={`mr-2 h-5 w-5 ${category.color}`} />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          {helperCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {helpers
                  .filter((helper) => category.name === "All" || helper.category === category.name)
                  .map((helper) => (
                    <Card key={helper.name}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={helper.avatar} alt={`Photo of ${helper.name}`} />
                          <AvatarFallback>{helper.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{helper.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{helper.description}</p>
                          {helper.remote && (
                            <Badge variant="secondary" className="mt-1">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <Button className="w-full bg-[rgb(65,105,226)] hover:bg-[rgb(45,85,206)]">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Info className="mr-2 h-4 w-4" />
                          Read More
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
  )
}