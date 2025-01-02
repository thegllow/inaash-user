import Footer from "@/components/common/footer"
import { Card } from "@nextui-org/card"
import { getTranslations } from "next-intl/server"

export default async function Page({ params }: { params: { locale: string } }) {
  const ar = params.locale === "ar"
  const t = await getTranslations("privacy-policy")
  return (
    <>
      <main className="container mx-auto max-w-7xl flex-grow px-6 ~pt-5/10">
        <section className="flex items-center justify-center gap-4 ~/md:~py-16/24">
          <Card shadow={"none"} className="w-full max-w-5xl shrink-0 rounded-xl bg-[#0A090959] p-1">
            <div className="mb-3 space-y-1 rounded-t-lg bg-[#1D1B1B] ~px-7/12 ~py-5/9">
              <h1 className="~text-xl/2xl">{t("title")}</h1>
              <p className="text-sm text-default-500">{t("description")}</p>
            </div>
            {ar ? (
              <article className="prose prose-invert ~p-4/8 lg:prose-lg [&>ul]:px-12">
                <ol>
                  <li>
                    <strong>جمع المعلومات الشخصية</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>
                  نقوم بجمع المعلومات الشخصية التي يقدمها المستخدم أثناء التسجيل أو استخدام المنصة، وتشمل:
                </p>
                <ul>
                  <li>الاسم الكامل.</li>
                  <li>رقم الهاتف للتحقق عبر (OTP)</li>
                  <li>البريد الإلكتروني.</li>
                  <li>البيانات مثل البرامج المكتملة والتقييمات.</li>
                  <li>
                    معلومات الدفع عند الاشتراك مع العلم بأنه سيتم مشاركتها مع بوابة الدفع المعتمدة بالمنصة و
                    تخضع المعلومات و حفظها لسياسة واحكام الطرف الثالث
                  </li>
                </ul>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; قد يتم جمع معلومات إضافية لتحسين التجربة، مثل اللغة المفضلة
                  وتاريخ النشاط داخل التطبيق.
                </p>
                <br />

                <ol start="2">
                  <li>
                    <strong>استخدام المعلومات الشخصية</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>تُستخدم البيانات الشخصية للأغراض التالية:</p>
                <ul>
                  <li>التحقق من هوية المستخدم (OTP)</li>
                  <li>تحسين تجربة الاستخدام عبر تخصيص المحتوى.</li>
                  <li>إصدار الشهادات وتوفير ميزة التحقق من صحتها باستخدام رمز QR</li>
                  <li>معالجة المدفوعات وتأمينها.</li>
                  <li>إرسال إشعارات متعلقة بالبرامج التدريبية أو التحديثات.</li>
                  <li>تحليل أداء المستخدم لتقديم توصيات شخصية.</li>
                </ul>
                <br />
                <ol start="3">
                  <li>
                    <strong>أمان البيانات</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>يتم اتخاذ تدابير تقنية وتنظيمية لضمان حماية بيانات المستخدم:</p>
                <ul>
                  <li>
                    <strong>التشفير:</strong> يتم تشفير البيانات أثناء النقل والتخزين.
                  </li>
                  <li>
                    <strong>تحديد الوصول:</strong> تقتصر صلاحيات الوصول إلى البيانات على موظفين معتمدين فقط.
                  </li>
                  <li>
                    <strong>مراقبة الأنظمة:</strong> يتم مراقبة الأنظمة بانتظام لتحديد أي اختراقات أو تهديدات
                    أمنية.
                  </li>
                </ul>
                <br />
                <ol start="4">
                  <li>
                    <strong>مشاركة المعلومات</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>لا يتم مشاركة المعلومات الشخصية مع أطراف ثالثة إلا في الحالات التالية:</p>
                <ul>
                  <li>الامتثال للقوانين المحلية أو الأحكام القضائية.</li>
                  <li>إتمام المعاملات المالية بالتنسيق مع مزودي خدمة الدفع.</li>
                  <li>توفير خدمات الدعم الفني أو تحسين العمليات.</li>
                </ul>
                <ol start="5">
                  <li>
                    <strong>ملفات تعريف الارتباط</strong> <strong>(Cookies)</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>تستخدم المنصة ملفات تعريف الارتباط لتحسين تجربة المستخدم، وتشمل:</p>
                <ul>
                  <li>تتبع تفضيلات المستخدم (مثل اللغة).</li>
                  <li>تحليل حركة المرور داخل التطبيق لتحسين الأداء.</li>
                  <li>تقديم محتوى مخصص بناءً على سلوك المستخدم.</li>
                </ul>
                <br />
                <ol start="6">
                  <li>
                    <strong>حقوق المستخدم</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <p>يحق للمستخدم:</p>
                <ul>
                  <li>طلب تعديل بياناته الشخصية.</li>
                  <li>حذف حسابه من التطبيق مع ضمان إزالة جميع بياناته.</li>
                  <li>الاطلاع على البيانات التي تحتفظ بها المنصة.</li>
                </ul>
                <br />
                <ol start="7">
                  <li>
                    <strong>التعديلات</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    تحتفظ انعاش بالحق في إجراء أي تعديل على إشعار الخصوصية من وقت لآخر دون الحاجة الى تقديم
                    إشعار بذلك ويعد استخدامك للموقع بعد هذه التعديلات قبولا بها، لذا يجب الاطلاع على إشعار
                    الخصوصية بشكل دوري للتأكد من معرفتك بأحدث نسخة منها.
                  </li>
                </ul>
                <br />

                <p>
                  <strong>. القبول بالشروط</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>باستخدام التطبيق، يوافق المستخدم على الشروط والأحكام التالية</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>يتحمل المستخدم مسؤولية مراجعة الشروط دوريًا لمعرفة التعديلات الجديدة</strong>
                    <strong>.</strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>. التسجيل والاستخدام</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>يجب على المستخدم تقديم معلومات دقيقة وكاملة أثناء التسجيل</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>يُمنع استخدام التطبيق لأغراض غير قانونية أو مخالفة للأخلاقيات</strong>
                    <strong>.</strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>. المحتوى والخدمات المقدمة</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>يقدم التطبيق محتوى تعليمي عبر فيديوهات تفاعلية مع أسئلة تقييمية</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>جميع الشهادات الصادرة تحمل رمز</strong>
                    <strong> QR </strong>
                    <strong>للتحقق من صحتها</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>قد يتم تحديث أو تغيير المحتوى وفقًا لتوصيات اللجنة العلمية أو الإدارة</strong>
                    <strong>.</strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>. سياسة الدفع</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>يتم الدفع لكل برنامج تدريب عبر بوابة دفع إلكترونية آمنة</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>لن يتمكن المستخدم من الوصول إلى البرامج دون إتمام الدفع</strong>
                    <strong>.</strong>
                  </li>
                </ul>

                <br />
                <p>
                  <strong>. المسؤولية</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>المنصة غير مسؤولة عن</strong>
                    <strong>:</strong>
                  </li>
                  <ul>
                    <li>
                      <strong>أي أخطاء ناتجة عن سوء استخدام المستخدم</strong>
                      <strong>.</strong>
                    </li>
                    <li>
                      <strong>انقطاع الخدمة بسبب أعطال تقنية خارجة عن السيطرة</strong>
                      <strong>.</strong>
                    </li>
                    <li>
                      <strong>أي خسائر ناجمة عن استخدام غير مصرح به للحساب الشخصي للمستخدم</strong>
                      <strong>.</strong>
                    </li>
                  </ul>
                </ul>

                <br />
                <p>
                  <strong>. إنهاء الخدمة</strong>
                  <strong>:</strong>
                </p>
                <ul>
                  <li>
                    <strong>تحتفظ الإدارة بحق إنهاء الحساب في حال</strong>
                    <strong>:</strong>
                  </li>
                  <ul>
                    <li>
                      <strong>انتهاك الشروط والأحكام</strong>
                      <strong>.</strong>
                    </li>
                    <li>
                      <strong>تقديم معلومات خاطئة أثناء التسجيل</strong>
                      <strong>.</strong>
                    </li>
                    <li>
                      <strong>استخدام الحساب لأغراض غير قانونية</strong>
                      <strong>.</strong>
                    </li>
                  </ul>
                </ul>
                <br />
                <ol start="9">
                  <li>
                    <strong> تعديل الشروط</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    <strong>قد يتم تعديل الشروط والأحكام وفقًا لمتطلبات التشغيل أو القوانين</strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>سيتم إخطار المستخدمين بالتعديلات الجديدة قبل سريانها</strong>
                    <strong>.</strong>
                  </li>
                </ul>
                <br />
                <ol start="10">
                  <li>
                    <strong> التواصل</strong>
                    <strong>:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    <strong>
                      يمكن للمستخدمين إرسال استفساراتهم أو شكاواهم عبر صفحة "تواصل معنا" داخل المنصة
                    </strong>
                    <strong>.</strong>
                  </li>
                  <li>
                    <strong>سيتم الرد على الرسائل في غضون 3-5 أيام عمل</strong>
                    <strong>.</strong>
                  </li>
                </ul>
                <br />
              </article>
            ) : (
              <article dir="ltr" className="prose prose-invert ~p-4/8 lg:prose-lg [&>ul]:px-12">
                <ol>
                  <li>
                    <strong>Collection of personal information:</strong>
                  </li>
                </ol>
                <p>
                  We collect personal information that the user provides during registration or use ofThe
                  platform, and includes:
                </p>
                <ul>
                  <li>full name.</li>
                  <li>phone numberTo verify via (OTP)</li>
                  <li>e-mail.</li>
                  <li>DataSuch as completed programs and evaluations..</li>
                  <li>
                    Payment information upon subscriptionNote that it will be shared with the platform&rsquo;s
                    approved payment gateway and the information and its storage are subject to the third
                    party&rsquo;s policy and provisions.
                  </li>
                </ul>
                <p>
                  Additional information may be collected to improve the experience, such as preferred
                  language and activity history within the app..
                </p>
                <ol start="2">
                  <li>
                    <strong>Use of Personal Information:</strong>
                  </li>
                </ol>
                <p>Personal data is used for the following purposes::</p>
                <ul>
                  <li>User identity verification(OTP)</li>
                  <li>Improve user experience by personalizing content.</li>
                  <li>Issue certificates and provide verification using a token.QR</li>
                  <li>Payment processing and security.</li>
                  <li>Send notifications regarding training programs or updates.</li>
                  <li>Analyze user performance to provide personalized recommendations..</li>
                </ul>
                <p>&nbsp;</p>
                <ol start="3">
                  <li>
                    <strong>Data Security:</strong>
                  </li>
                </ol>
                <p>Technical and organizational measures are taken to ensure the protection of user data.:</p>
                <ul>
                  <li>
                    <strong>Encryption:</strong>Data is encrypted during transmission and storage.
                  </li>
                  <li>
                    <strong>Access limitation:</strong>Access to data is limited to authorized personnel only.
                  </li>
                  <li>
                    <strong>Systems monitoring:</strong>Systems are monitored regularly to identify any
                    breaches or security threats.
                  </li>
                </ul>
                <p>&nbsp;</p>
                <ol start="4">
                  <li>
                    <strong>Information sharing:</strong>
                  </li>
                </ol>
                <p>Personal information is not shared with third parties except in the following cases::</p>
                <ul>
                  <li>Compliance with local laws or court orders.</li>
                  <li>Complete financial transactions in coordination with payment service providers..</li>
                  <li>Providing technical support services or improving operations.</li>
                </ul>
                <ol start="5">
                  <li>
                    <strong>Cookies (Cookies):</strong>
                  </li>
                </ol>
                <p>used The platformCookies to improve user experience, including::</p>
                <ul>
                  <li>Track user preferences (such as language).</li>
                  <li>Analyze in-app traffic to improve performance.</li>
                  <li>Deliver personalized content based on user behavior.</li>
                </ul>
                <p>&nbsp;</p>
                <ol start="6">
                  <li>
                    <strong>User rights:</strong>
                  </li>
                </ol>
                <p>The user has the right to:</p>
                <ul>
                  <li>Request to modify his personal data.</li>
                  <li>Delete his account from the application, ensuring that all his data is removed..</li>
                  <li>View the data thatKeepWith itThe platform.</li>
                </ul>
                <p>&nbsp;</p>
                <ol start="7">
                  <li>
                    <strong>Modifications:</strong>
                  </li>
                </ol>
                <ul>
                  <li>
                    KeepRefreshWe reserve the right to make any amendments to the Privacy Notice from time to
                    time without the need to provide notice thereof. Your use of the Site after such
                    amendments constitutes acceptance thereof. Therefore, you should review the Privacy Notice
                    periodically to ensure that you are aware of the latest version thereof.
                  </li>
                </ul>

                <br />
                <p>
                  <strong>.Acceptance of terms:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      By using the application, the user agrees to the following terms and conditions:.
                    </strong>
                  </li>
                  <li>
                    <strong>
                      It is the user's responsibility to review the terms periodically for new amendments..
                    </strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>.Registration and Use:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      The user must provide accurate and complete information during registration..
                    </strong>
                  </li>
                  <li>
                    <strong>The application may not be used for any illegal or immoral purposes..</strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>.Content and Services Provided:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      The application provides educational content through interactive videos with assessment
                      questions..
                    </strong>
                  </li>
                  <li>
                    <strong>All issued certificates bear the symbolQR to verify its authenticity.</strong>
                  </li>
                  <li>
                    <strong>
                      Content may be updated or changed according to the recommendations of the Scientific
                      Committee or the Administration..
                    </strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>. PolicyPayment:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      Payment for each training program is made via a secure electronic payment gateway..
                    </strong>
                  </li>
                  <li>
                    <strong>
                      The user will not be able to access the software without completing the payment..
                    </strong>
                  </li>
                </ul>

                <br />
                <p>
                  <strong>.Responsibility:</strong>
                </p>
                <ul>
                  <li>
                    <strong>The platformirresponsibleAndon:</strong>
                  </li>
                  <ul>
                    <li>
                      <strong>Any errors resulting from user misuse.</strong>
                    </li>
                    <li>
                      <strong>Service interruption due to technical failures beyond our control.</strong>
                    </li>
                    <li>
                      <strong>
                        Any losses resulting from unauthorized use of the User's personal account.
                      </strong>
                    </li>
                  </ul>
                </ul>

                <br />
                <p>
                  <strong>.Termination of service:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      The administration reserves the right to terminate the account in the event of::
                    </strong>
                  </li>
                  <ul>
                    <li>
                      <strong>Violation of Terms and Conditions.</strong>
                    </li>
                    <li>
                      <strong>Providing incorrect information during registration.</strong>
                    </li>
                    <li>
                      <strong>Using the account for illegal purposes.</strong>
                    </li>
                  </ul>
                </ul>
                <br />
                <p>
                  <strong>9.Modify Terms:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      Terms and Conditions may be modified according to operating requirements or laws..
                    </strong>
                  </li>
                  <li>
                    <strong>Users will be notified of new changes before they take effect..</strong>
                  </li>
                </ul>
                <br />
                <p>
                  <strong>10.communication:</strong>
                </p>
                <ul>
                  <li>
                    <strong>
                      Users can submit their inquiries or complaints via the &ldquo;Contact Us&rdquo; page
                      withinThe platform.
                    </strong>
                  </li>
                  <li>
                    <strong>Messages will be replied within 3-5 business days..</strong>
                  </li>
                </ul>
                <br />
              </article>
            )}
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}
