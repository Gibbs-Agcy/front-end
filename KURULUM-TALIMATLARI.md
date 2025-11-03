# 🚀 Node.js Kurulum Talimatları

## ADIM 1: Node.js İndirin

1. Bu linke tıklayın: **https://nodejs.org**
2. Yeşil butona tıklayıp **LTS** (Long Term Support) versiyonunu indirin
3. İndirilen `.msi` dosyasını çalıştırın

## ADIM 2: Node.js'i Kurun

1. Next > Next tıklayın
2. "Accept the terms" kutusunu işaretleyin
3. **ÖNEMLİ:** "Automatically install the necessary tools" seçeneğini İŞARETLEYİN
4. Install'a tıklayın
5. Kurulum bitince "Finish" tıklayın

## ADIM 3: Bilgisayarı Yeniden Başlatın

**MUTLAKA bilgisayarınızı yeniden başlatın!** (Veya en azından tüm PowerShell/Terminal pencerelerini kapatıp yeniden açın)

## ADIM 4: Kontrol Edin

Yeni bir PowerShell açın ve şu komutu çalıştırın:

```powershell
node --version
npm --version
```

Her ikisi de versiyon numarası gösteriyorsa kurulum başarılı!

## ADIM 5: Projeyi Başlatın

```powershell
cd C:\Users\İbrahim\Desktop\app
npm install
npm run dev
```

Tarayıcınızda http://localhost:3000 adresini açın!

---

## ⚠️ Sorun Yaşarsanız

### "npm bulunamadı" hatası devam ediyorsa:

1. Windows Arama'da **"env"** yazın
2. **"Edit the system environment variables"** seçin
3. **"Environment Variables"** butonuna tıklayın
4. **"Path"** değişkenini bulup **"Edit"** tıklayın
5. Şu satırların olduğunu kontrol edin:
   - `C:\Program Files\nodejs\`
   - `%APPDATA%\npm`
6. Yoksa **"New"** ile ekleyin
7. Tüm pencereleri OK ile kapatın
8. Bilgisayarı yeniden başlatın

### PowerShell script hatası alırsanız:

PowerShell'i **Administrator olarak** açıp şunu çalıştırın:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📞 Yardım

Hala çalışmazsa, bana şu komutların çıktısını gönderin:

```powershell
node --version
npm --version
echo $env:PATH
```

