# Client પાસેથી લેવાની Rate Information — Website Price Estimator Setup

> **કોના માટે:** આ document **website બનાવનાર (developer/you)** માટે છે.
> **હેતુ:** Client (business owner — Veer Aluminium) પાસેથી નીચેના **rates / charges** એકવાર બરાબર લઈ લેવા, જેથી website નું **Price Estimator / Calculator** સાચો estimate આપે. પછી client પોતે **CMS** માંથી આ values edit કરી શકશે.
>
> **Logic સમજો:** Estimator સામાન્ય રીતે આ formula પર ચાલે છે —
> **`Estimate = (Area × Base Rate) + Glass + Finish + Mesh + Hardware + Labour + GST`**
> એટલે દરેક item નો **per Sq.ft / per Unit rate** client પાસેથી લેવો પડે.

---

## 1. Base Rate — Product wise (per Sq.ft)

Client પાસેથી દરેક product નો **basic rate ₹/Sq.ft** મંગાવો (aluminium + standard fitting સાથે, glass વગર અથવા સાથે — એ પણ પૂછી લો):

| Product Type | Rate ₹/Sq.ft | Notes (glass સાથે કે વગર?) |
|--------------|-------------|----------------------------|
| Sliding Window (2 Track) | ___ | |
| Sliding Window (3 Track) | ___ | |
| Openable / Casement Window | ___ | |
| Fix Window | ___ | |
| Sliding Door | ___ | |
| Openable Door | ___ | |
| Slide-Fold Door | ___ | |
| Glass Partition | ___ | |
| Toughened Glass Door | ___ | |

> **મહત્વનું:** આ rate **only labour (job work)** નો છે કે **material + labour** બંને નો — એ સ્પષ્ટ લખાવો.

---

## 2. Aluminium Section / Series wise Difference

એક જ window નો rate section ના **weight (kg/mtr)** અને **series** પ્રમાણે બદલાય છે. એટલે:

| Series / Profile | Brand | Rate ₹/Sq.ft (કે Base પર +%) |
|------------------|-------|------------------------------|
| Light section | Local | ___ |
| Medium section | Jindal | ___ |
| Heavy section | Jindal/Hindalco | ___ |

> Client પાસેથી પૂછો: અલગ series માટે **fixed rate** આપવો છે કે **base rate + extra %** (multiplier)? — CMS માટે multiplier વધારે flexible છે.

---

## 3. Glass Rate (per Sq.ft) — Type & Thickness wise

| Glass Type | 4mm | 5mm | 6mm | 8mm | 10mm | 12mm |
|------------|-----|-----|-----|-----|------|------|
| Plain / Float | | | | | | |
| Toughened | | | | | | |
| Frosted | | | | | | |
| Tinted | | | | | | |
| Reflective | | | | | | |
| DGU (Double Glazed) | | | | | | |
| Laminated | | | | | | |

> Glass rate **base માં included** છે કે **અલગ add** કરવાનો — confirm કરો.

---

## 4. Finish / Color — Extra Charge

| Finish | Extra ₹/Sq.ft (કે +%) |
|--------|----------------------|
| Mill Finish (plain) | 0 (base) |
| Powder Coated (standard color) | ___ |
| Powder Coated (premium/custom color) | ___ |
| Anodized (Silver/Champagne) | ___ |
| Anodized (Black) | ___ |
| Wooden Finish (PVDF/Sublimation) | ___ |

---

## 5. Mesh / Jali (Mosquito Net) — Rate

| Mesh Type | Rate ₹/Sq.ft (કે per Window) |
|-----------|------------------------------|
| SS Mesh | ___ |
| Fiber Mesh | ___ |
| Pleated (Openable) | ___ |
| Roller Mesh | ___ |

---

## 6. Hardware / Fittings — Extra (per Window/Door)

| Item | Charge ₹ |
|------|---------|
| Normal Lock | ___ |
| Multipoint Lock | ___ |
| Smart Lock | ___ |
| Premium Handle | ___ |
| Heavy-duty SS Rollers | ___ |
| Friction Stay (per pc) | ___ |

---

## 7. ACP / Cladding — Rate (per Sq.ft)

| ACP Grade | 3mm | 4mm |
|-----------|-----|-----|
| Normal | ___ | ___ |
| FR (Fire Retardant) | ___ | ___ |

- Framing structure (GI/Aluminium) અલગ charge: ₹___ /Sq.ft
- Wooden / Metallic / Mirror finish extra: ₹___ /Sq.ft

---

## 8. Railing — Rate (per Running Ft)

| Railing Type | Rate ₹/R.ft |
|--------------|-------------|
| SS Railing | ___ |
| Glass Railing | ___ |
| Aluminium Railing | ___ |

---

## 9. Labour / Installation Charges

- Installation **base માં included** છે કે **અલગ**? — હા / ના
- જો અલગ: ₹___ /Sq.ft અથવા ₹___ /Window
- **Dismantling** (જૂનું કાઢવાનું): ₹___
- **Scaffolding** (height wise): ₹___
- **Site Visit / Survey charge**: ₹___ (refundable / free?)

---

## 10. General / Calculator Settings

- **GST %**: ___ (દા.ત. 18%) — estimate માં બતાવવો કે નહીં
- **Minimum Order** value: ₹___ (આનાથી નીચે estimate નહીં)
- **Minimum Area** per window: ___ Sq.ft (દા.ત. 10 Sq.ft થી નીચે round-up)
- **Transport / Delivery** charge: ₹___ (કે distance wise)
- **Discount** આપવો છે? Festive/Bulk — % range: ___
- Estimate ઉપર **"Approx — final quote after site visit"** disclaimer બતાવવો? — હા / ના
- Rate **round-off** કેવી રીતે — nearest ₹10 / ₹100

---

## ✅ Developer Checklist — CMS Setup

| # | Data Point | Client પાસેથી મળ્યું? | CMS માં editable? |
|---|-----------|----------------------|-------------------|
| 1 | Product base rates (₹/Sq.ft) | ☐ | ☐ |
| 2 | Series / Section multipliers | ☐ | ☐ |
| 3 | Glass rates (type × thickness) | ☐ | ☐ |
| 4 | Finish / Color extra | ☐ | ☐ |
| 5 | Mesh rates | ☐ | ☐ |
| 6 | Hardware charges | ☐ | ☐ |
| 7 | ACP rates | ☐ | ☐ |
| 8 | Railing rates | ☐ | ☐ |
| 9 | Labour / Install / Site charges | ☐ | ☐ |
| 10 | GST %, Min order, Discount | ☐ | ☐ |

---

> **Tip (you ↔ client):** Client પાસેથી એક **filled rate sheet** (ઉપરના tables ભરેલા) Excel/photo માં મંગાવો. એ values થી CMS ના default seed કરો. દરેક field CMS માં editable રાખો — જેથી market rate બદલાય ત્યારે client પોતે update કરી શકે, અને તમારે code બદલવો ન પડે.
