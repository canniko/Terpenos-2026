"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Tag, Clock, Share2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample blog post data - keeping only the Cannabis Oil blog
const blogPostsData = [
  {
    id: 1,
    title: "The Long Tradition of Cannabis-Infused Oils with a Recipe",
    excerpt:
      "Explore the ancient history and modern applications of cannabis-infused oils, along with a detailed recipe for making your own infusion with specific terpenes.",
    content: `
      <p>
        The practice of infusing cannabis with oils is a time-honored tradition that spans centuries and
        cultures, reflecting a deep understanding of the plant's medicinal and therapeutic potential. Ancient
        civilizations, such as those in China and India, were among the first to explore the benefits of
        cannabis-infused oils. In traditional Chinese medicine, cannabis was used as a key ingredient in various
        remedies, with records dating back to 2737 BCE in its use for treating ailments such as pain and
        inflammation. Similarly, in India, cannabis has been an integral part of Ayurvedic medicine, where it is
        known as "bhang" and used in oils and pastes to treat a variety of conditions, including digestive
        issues and skin diseases.
      </p>

      <p>
        The Middle East also has a rich history of cannabis use, particularly in regions like Persia (modern-day
        Iran), where cannabis-infused oils were utilized for their analgesic and anti-inflammatory properties.
        Islamic physicians during the medieval period, such as Avicenna, documented the therapeutic applications
        of cannabis in their medical texts, highlighting its role in pain relief and muscle relaxation. These
        ancient practices eventually spread to other parts of the world, including Africa and Europe, where
        cannabis-infused oils were incorporated into folk medicine traditions for their soothing and healing
        effects.
      </p>

      <p>
        In more recent history, the use of cannabis-infused oils has seen a resurgence, driven by growing
        interest in natural and holistic health remedies. The storied traditions of cannabis infusion methods
        have been revived and refined, combining ancient wisdom with modern scientific understanding. Today,
        cannabis-infused oils are widely recognized for their versatility and efficacy, continuing a legacy of
        healing that has transcended time and geography.
      </p>

      <h2>Cannabis-Infused Oil Recipe with Terpenes</h2>

      <h3>Ingredients:</h3>
      <ul>
        <li>1 cup of coconut oil or olive oil (according to your preference)</li>
        <li>10 grams of cannabis flowers (decarboxylated)</li>
        <li>
          Terpenes (optional, according to preference):
          <ul>
            <li>2 drops of Limonene (for a citrus aroma and energizing effects)</li>
            <li>2 drops of Linalool (for a floral aroma and relaxing effects)</li>
            <li>2 drops of Myrcene (for an earthy aroma and sedative effects)</li>
          </ul>
        </li>
      </ul>

      <h3>Utensils:</h3>
      <ul>
        <li>Coffee grinder or herb grinder</li>
        <li>Baking tray</li>
        <li>Parchment paper</li>
        <li>Double boiler or a pot and a heat-resistant container</li>
        <li>Fine mesh strainer or cheesecloth</li>
        <li>Glass jar for storage</li>
      </ul>

      <h3>Instructions:</h3>

      <h4>Decarboxylation of Cannabis:</h4>
      <ol>
        <li>Preheat the oven to 115°C (240°F).</li>
        <li>Grind the cannabis flowers with the coffee grinder or herb grinder.</li>
        <li>Place the ground cannabis on a baking tray lined with parchment paper.</li>
        <li>
          Bake the cannabis for 30-40 minutes, stirring every 10 minutes to ensure even decarboxylation. This
          process activates the psychoactive compounds in the cannabis.
        </li>
      </ol>

      <h4>Infusion of the Oil:</h4>
      <ol>
        <li>Fill the bottom part of the double boiler with water and bring it to a low simmer.</li>
        <li>Place the oil (coconut or olive) in the top part of the double boiler.</li>
        <li>Add the decarboxylated cannabis to the oil.</li>
        <li>
          Keep the mixture on low heat for 2-3 hours, stirring occasionally. Ensure the oil does not boil.
        </li>
      </ol>

      <h4>Addition of Terpenes (Optional):</h4>
      <ol>
        <li>
          If you want to add specific terpenes, add them to the warm oil after the infusion process, stirring
          well to mix evenly.
        </li>
      </ol>

      <h4>Straining:</h4>
      <ol>
        <li>
          Once the infusion is complete, strain the mixture through a fine mesh strainer or cheesecloth to
          separate the oil from the cannabis residue.
        </li>
        <li>Squeeze the residue well to extract as much oil as possible.</li>
      </ol>

      <h4>Storage:</h4>
      <ol>
        <li>Pour the infused oil into a clean glass jar.</li>
        <li>Store in a cool, dark place. The cannabis oil can last up to two months if stored properly.</li>
      </ol>

      <h3>Usage:</h3>
      <p>
        You can use this infused oil in various culinary recipes, such as salad dressings, sautéed dishes, or
        even as a substitute for oil in baked goods. It can also serve as a base for homemade creams or balms.
      </p>

      <h3>Notes:</h3>
      <ul>
        <li>
          <strong>Dosage:</strong> It's important to remember that the potency of the oil depends on the
          concentration of THC and CBD in the cannabis flower used. Start with a small amount and adjust
          according to your needs and tolerance.
        </li>
        <li>
          <strong>Terpenes:</strong> Adding terpenes is optional and can be adjusted according to your preferred
          aroma and desired effects.
        </li>
      </ul>

      <p>I hope you enjoy preparing and using this cannabis-infused oil!</p>

      <div class="bg-terpenos-light-green p-6 rounded-lg mt-8 mb-8">
        <p class="text-terpenos-forest-green font-medium italic">
          This recipe is intended solely for personal consumption and is not meant to cure any illness or health
          issue. The use of cannabis-infused oils should be carried out responsibly and in accordance with local
          and national cannabis laws. Always consult with a healthcare professional before using cannabis
          products, especially if you have pre-existing medical conditions or are taking medications.
        </p>
      </div>

      <p>
        This recipe combines traditional infusion methods with modern understanding of terpenes, allowing you to
        customize the aromatic and therapeutic profile of your cannabis-infused oil. The addition of specific
        terpenes enhances not only the sensory experience but also potentially the therapeutic effects through
        what is known as the "entourage effect" – the synergistic interaction between cannabinoids and terpenes.
      </p>

      <p>
        As you embark on creating your own cannabis-infused oils, you're participating in a tradition that
        connects you to healers and herbalists across millennia, while also embracing contemporary knowledge
        about plant medicine and wellness.
      </p>
    `,
    date: "May 10, 2023",
    author: "Alex Garcia",
    category: "Traditional Medicine",
    readTime: "10 min read",
    image: "/cannabis-infused-oil.jpeg",
    slug: "cannabis-infused-oils-tradition-recipe",
    tags: ["Traditional Medicine", "Recipes", "Terpenes", "Cannabis"],
  },
]

export default function BlogPostPage() {
  const { t } = useLanguage()
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the blog post with the matching slug
    const slug = params.slug as string
    const foundPost = blogPostsData.find((p) => p.slug === slug)

    if (foundPost) {
      // Create a translated version of the post
      const translatedPost = {
        ...foundPost,
        title: slug === "cannabis-infused-oils-tradition-recipe" ? t("blog.cannabis_oil.title") : foundPost.title,
        excerpt: slug === "cannabis-infused-oils-tradition-recipe" ? t("blog.cannabis_oil.excerpt") : foundPost.excerpt,
        // For other posts, we keep the original content
        // For the cannabis oil post, we'll handle the content translation in the render method
      }
      setPost(translatedPost)
    } else {
      // Redirect to blog listing if post not found
      router.push("/blog")
    }

    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terpenos-green"></div>
      </div>
    )
  }

  if (!post) {
    return null // This shouldn't render as we redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Featured Image */}
      <section className="w-full relative">
        <div className="aspect-[21/9] w-full overflow-hidden">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 -mt-32 pb-8">
          <div className="bg-white dark:bg-gray-900 p-6 md:p-10 rounded-lg shadow-lg max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-terpenos-light-green text-terpenos-forest-green"
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <Avatar>
                <AvatarImage src="/images/alex-garcia.jpeg" alt={post.author} />
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {post.date}
                  <Clock className="ml-4 mr-2 h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {post.slug === "cannabis-infused-oils-tradition-recipe" ? (
                <>
                  <p>{t("blog.cannabis_oil.history.p1")}</p>
                  <p>{t("blog.cannabis_oil.history.p2")}</p>
                  <p>{t("blog.cannabis_oil.history.p3")}</p>

                  <h2>{t("blog.cannabis_oil.recipe.title")}</h2>

                  <h3>{t("blog.cannabis_oil.recipe.ingredients.title")}</h3>
                  <ul>
                    {t("blog.cannabis_oil.recipe.ingredients.list")
                      .split("\n")
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    <li>
                      {t("blog.cannabis_oil.recipe.ingredients.terpenes.intro")}
                      <ul>
                        <li>{t("blog.cannabis_oil.recipe.ingredients.terpenes.limonene")}</li>
                        <li>{t("blog.cannabis_oil.recipe.ingredients.terpenes.linalool")}</li>
                        <li>{t("blog.cannabis_oil.recipe.ingredients.terpenes.myrcene")}</li>
                      </ul>
                    </li>
                  </ul>

                  <h3>{t("blog.cannabis_oil.recipe.utensils.title")}</h3>
                  <ul>
                    {t("blog.cannabis_oil.recipe.utensils.list")
                      .split("\n")
                      .map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                  </ul>

                  <h3>{t("blog.cannabis_oil.recipe.instructions.title")}</h3>

                  <h4>{t("blog.cannabis_oil.recipe.instructions.decarb.title")}</h4>
                  <ol>
                    {t("blog.cannabis_oil.recipe.instructions.decarb.steps")
                      .split("\n")
                      .map((step, index) => (
                        <li key={index}>{step.substring(step.indexOf(".") + 1).trim()}</li>
                      ))}
                  </ol>

                  <h4>{t("blog.cannabis_oil.recipe.instructions.infusion.title")}</h4>
                  <ol>
                    {t("blog.cannabis_oil.recipe.instructions.infusion.steps")
                      .split("\n")
                      .map((step, index) => (
                        <li key={index}>{step.substring(step.indexOf(".") + 1).trim()}</li>
                      ))}
                  </ol>

                  <h4>{t("blog.cannabis_oil.recipe.instructions.terpenes.title")}</h4>
                  <ol>
                    {t("blog.cannabis_oil.recipe.instructions.terpenes.steps")
                      .split("\n")
                      .map((step, index) => (
                        <li key={index}>{step.substring(step.indexOf(".") + 1).trim()}</li>
                      ))}
                  </ol>

                  <h4>{t("blog.cannabis_oil.recipe.instructions.straining.title")}</h4>
                  <ol>
                    {t("blog.cannabis_oil.recipe.instructions.straining.steps")
                      .split("\n")
                      .map((step, index) => (
                        <li key={index}>{step.substring(step.indexOf(".") + 1).trim()}</li>
                      ))}
                  </ol>

                  <h4>{t("blog.cannabis_oil.recipe.instructions.storage.title")}</h4>
                  <ol>
                    {t("blog.cannabis_oil.recipe.instructions.storage.steps")
                      .split("\n")
                      .map((step, index) => (
                        <li key={index}>{step.substring(step.indexOf(".") + 1).trim()}</li>
                      ))}
                  </ol>

                  <h3>{t("blog.cannabis_oil.recipe.usage.title")}</h3>
                  <p>{t("blog.cannabis_oil.recipe.usage.text")}</p>

                  <h3>{t("blog.cannabis_oil.recipe.notes.title")}</h3>
                  <ul>
                    <li>
                      <strong>{t("blog.cannabis_oil.recipe.notes.dosage").split(":")[0]}:</strong>{" "}
                      {t("blog.cannabis_oil.recipe.notes.dosage").split(":")[1].trim()}
                    </li>
                    <li>
                      <strong>{t("blog.cannabis_oil.recipe.notes.terpenes").split(":")[0]}:</strong>{" "}
                      {t("blog.cannabis_oil.recipe.notes.terpenes").split(":")[1].trim()}
                    </li>
                  </ul>

                  <p>{t("blog.cannabis_oil.recipe.conclusion")}</p>

                  <div className="bg-terpenos-light-green p-6 rounded-lg mt-8 mb-8">
                    <p className="text-terpenos-forest-green font-medium italic">{t("blog.cannabis_oil.disclaimer")}</p>
                  </div>

                  <p>{t("blog.cannabis_oil.closing.p1")}</p>

                  <p>{t("blog.cannabis_oil.closing.p2")}</p>
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              )}
            </article>

            {/* Share and Navigation */}
            <div className="mt-12 pt-6 border-t border-terpenos-light-green">
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={() => router.push("/blog")} className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.back_to_blog")}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    alert(t("blog.link_copied"))
                  }}
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  {t("blog.share_article")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
