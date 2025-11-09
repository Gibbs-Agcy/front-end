import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { ScrollReveal } from '@/app/components/animations/scroll-reveal'

/**
 * About page
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <ScrollReveal>
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          Hakkımızda
        </h1>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl space-y-8">
        <ScrollReveal delay={0.2}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Biz Kimiz?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Gibbs Agency olarak, modern web teknolojileri kullanarak
                dijital deneyimler oluşturuyoruz. Müşterilerimize en iyi
                çözümleri sunmak için sürekli kendimizi geliştiriyoruz.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Misyonumuz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                İnovatif çözümlerle müşterilerimizin dijital varlıklarını
                güçlendirmek ve onlara rekabet avantajı sağlamak.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Vizyonumuz</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Türkiye'nin önde gelen dijital ajanslarından biri olmak ve
                global pazarda da yer almak.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}

