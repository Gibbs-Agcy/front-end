import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { ScrollReveal } from '@/app/components/animations/scroll-reveal'

/**
 * Terms of Service page
 */
export default function TermsPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <ScrollReveal>
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          Kullanım Şartları
        </h1>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl space-y-8">
        <ScrollReveal delay={0.2}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Kabul</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Bu web sitesini kullanarak, aşağıdaki kullanım şartlarını kabul
                etmiş sayılırsınız. Şartları kabul etmiyorsanız, lütfen bu
                siteyi kullanmayın.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Kullanım Kısıtlamaları</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Web sitemizin içeriğini izinsiz kopyalayamaz, dağıtamaz veya
                ticari amaçlarla kullanamazsınız. Tüm içerik telif hakkı
                koruması altındadır.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Değişiklikler</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Bu kullanım şartlarını istediğimiz zaman değiştirme hakkını
                saklı tutarız. Değişiklikler yürürlüğe girdiğinde, bu sayfada
                yayınlanacaktır.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}

