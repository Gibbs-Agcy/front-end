import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { ScrollReveal } from '@/app/components/animations/scroll-reveal'

/**
 * Privacy Policy page
 */
export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-24 px-4">
      <ScrollReveal>
        <h1 className="mb-8 text-center text-4xl font-bold md:text-5xl">
          Gizlilik Politikası
        </h1>
      </ScrollReveal>

      <div className="mx-auto max-w-3xl space-y-8">
        <ScrollReveal delay={0.2}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Veri Toplama</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Web sitemizi ziyaret ettiğinizde, belirli bilgiler otomatik
                olarak toplanabilir. Bu bilgiler, IP adresiniz, tarayıcı
                türünüz ve ziyaret ettiğiniz sayfaları içerebilir.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Çerezler</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler
                kullanmaktadır. Çerezleri tarayıcı ayarlarınızdan
                yönetebilirsiniz.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Veri Güvenliği</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                Topladığımız verileri güvenli bir şekilde saklıyor ve üçüncü
                taraflarla paylaşmıyoruz. Verileriniz yalnızca yasal
                yükümlülüklerimiz gereği paylaşılabilir.
              </p>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </div>
  )
}

