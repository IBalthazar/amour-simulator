const screens = document.querySelectorAll("[data-screen]");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

const surveyScale = [
    { label: "Strongly agree", value: "strongly-agree", score: 2 },
    { label: "Agree", value: "agree", score: 1 },
    {
        label: "Neither agree nor disagree",
        value: "neutral",
        score: 0,
    },
    { label: "Disagree", value: "disagree", score: -1 },
    { label: "Strongly disagree", value: "strongly-disagree", score: -2 },
];

/*
    These are the broad beliefs the user answers before the scenarios.
    Each scenario later compares back to one of these.
*/
const surveyQuestions = [
    {
        id: "belief-1",
        prompt:
            "A person’s emotional vulnerability should affect how we respond to their romantic interest.",
    },
    {
        id: "belief-2",
        prompt: "Love sometimes requires major personal sacrifice.",
    },
    {
        id: "belief-3",
        prompt:
            "Past sacrifices can create responsibilities or obligations in a relationship.",
    },
    {
        id: "belief-4",
        prompt:
            "A person’s past should not completely define who they are today.",
    },
    {
        id: "belief-5",
        prompt: "Family opinions should matter in serious relationships.",
    },
    {
        id: "belief-6",
        prompt:
            "People in relationships are still entitled to private thoughts, fantasies, and personal space.",
    },
    {
        id: "belief-7",
        prompt: "People can genuinely change over time.",
    },
    {
        id: "belief-8",
        prompt:
            "Having romantic feelings for more than one person does not automatically invalidate a current relationship.",
    },
    {
        id: "belief-9",
        prompt:
            "Until exclusivity is clearly discussed, people are free to pursue other romantic options.",
    },
    {
        id: "belief-10",
        prompt: "Romantic attraction can grow over time.",
    },
    {
        id: "belief-11",
        prompt: "Sex and romantic love can exist separately.",
    },
    {
        id: "belief-12",
        prompt:
            "Trust should not require constant proof, checking, or monitoring.",
    },
    {
        id: "belief-13",
        prompt:
            "Stability and compatibility can be enough for a relationship even without strong romantic passion.",
    },
    {
        id: "belief-14",
        prompt:
            "Love does not create an obligation to satisfy all of a partner’s sexual desires.",
    },
].map((question) => ({
    ...question,
    options: surveyScale,
}));

/*
    stance:
     2  = strongly supports the related survey statement
     1  = generally supports it
     0  = mixed / does not clearly test it
    -1  = generally pushes against it
    -2  = strongly pushes against it

    This is NOT a moral score.
    It only compares a later choice to the user's earlier belief.
*/

const scenarioQuestions = [
    {
        topic: "Vulnerability and Consent",
        beliefId: "belief-1",

        reading: "Louise Perry — “Consent Is Not Enough”",

        readingSummary:
            "Perry argues that consent alone does not settle every moral question. This scenario applies that concern to a person who may be emotionally vulnerable after a breakup.",

        quote: "“Consent is not enough.”",

        question:
            "Your best friend is going through a breakup. You have been interested in them for years, but nothing ever happened because you were afraid to confess. While feeling lost and uncertain, your friend confides in you and admits feelings you have been hoping to hear for years. You are unsure whether they are in the right state of mind to begin a relationship.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "💬",
                label:
                    "Tell them you feel the same, but suggest waiting until they have had time to process the breakup before starting anything.",

                stance: 2,

                analysis:
                    "You acknowledged the mutual feelings while allowing their emotional state to affect the timing. Your choice gives vulnerability moral weight without assuming that the confession itself is meaningless.",
            },
            {
                icon: "⚡",
                label:
                    "Take the opportunity and pursue the relationship now because their feelings may be genuine regardless of the timing.",

                stance: -2,

                analysis:
                    "You placed more weight on the sincerity of the confession and the opportunity in front of you than on waiting because of their recent breakup. This tests whether vulnerability should change how much weight you place on a person’s immediate choice.",
            },
            {
                icon: "🤝",
                label:
                    "Tell them how you feel, but leave the decision entirely in their hands and trust them to know what they want.",

                stance: 0,

                analysis:
                    "You recognized the vulnerability but ultimately placed responsibility for the decision with your friend. This sits between protecting them from the situation and treating their current consent as fully decisive.",
            },
            {
                icon: "🛑",
                label:
                    "Keep your feelings to yourself for now because acting while they are vulnerable would make you uncomfortable.",

                stance: 2,

                analysis:
                    "You treated emotional vulnerability as a strong reason not to act, even though the opportunity was something you had wanted for years. Your response prioritizes timing and caution over immediate desire.",
            },
        ],
    },

    {
        topic: "Love and Sacrifice",
        beliefId: "belief-2",

        reading: "Helen Fisher — Why We Love, Chapter 1",

        readingSummary:
            "Fisher describes lovers as changing priorities and rearranging their lives to accommodate a beloved. This scenario asks what happens when both partners have something important to lose.",

        quote: "“Lovers rearrange their lives to accommodate a beloved.”",

        question:
            "Your partner of seven years receives an opportunity of a lifetime but must move out of town. You also have an important opportunity. Neither of you wants a long-distance relationship, and you both had plans to eventually get married. The ring has already been purchased.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "💍",
                label:
                    "Give up your opportunity and move with your partner because preserving the relationship matters more to you.",

                stance: 2,

                analysis:
                    "You treated sacrifice as a legitimate part of maintaining a serious relationship and placed the relationship above your individual opportunity.",
            },
            {
                icon: "🎯",
                label:
                    "Ask your partner to give up their opportunity because you believe yours is more important to your future.",

                stance: 1,

                analysis:
                    "Your response still assumes that major sacrifice may be required, but you place that sacrifice on your partner rather than yourself. The difficult question becomes whose goals receive priority.",
            },
            {
                icon: "📡",
                label:
                    "Both take the opportunities and attempt long distance even though neither of you originally wanted it.",

                stance: 0,

                analysis:
                    "You resisted making either person give up the opportunity and instead changed the structure of the relationship. This avoids the central sacrifice while accepting a different kind of cost.",
            },
            {
                icon: "💔",
                label:
                    "Accept that neither person should have to sacrifice such an important opportunity and seriously consider ending the relationship.",

                stance: -2,

                analysis:
                    "You placed individual life opportunities above the idea that love should require a major sacrifice. Your decision suggests there may be limits to what commitment can reasonably demand.",
            },
        ],
    },

    {
        topic: "Obligation After Sacrifice",
        beliefId: "belief-3",

        reading:
            "Berit Brogaard — On Romantic Love; Helen Fisher — Why We Love",

        readingSummary:
            "The scenario separates gratitude, attachment, obligation, and romantic attraction. It asks whether another person’s past sacrifices create a responsibility to remain in a relationship after your romantic feelings have changed.",

        question:
            "Your partner has supported you through everything. When you had stage-three cancer, they paid your medical bills, took time off work, and turned down career opportunities to care for you. About a year after you fully recover, you realize that you have lost your romantic feelings. You do not know how to tell them that you may no longer be compatible because you do not want to hurt them or make the wrong decision.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🗣️",
                label:
                    "Tell them honestly that your feelings have changed, even though you know it may deeply hurt them.",

                stance: -2,

                analysis:
                    "You separated gratitude from an obligation to remain romantically committed. Your choice suggests that what a partner has done for you does not automatically create a debt that must be repaid by staying.",
            },
            {
                icon: "🧱",
                label:
                    "Stay in the relationship for now because everything they sacrificed makes leaving feel unfair.",

                stance: 2,

                analysis:
                    "You gave the partner’s sacrifices direct weight in deciding whether to stay. Gratitude and obligation become reasons to continue even though your romantic feelings have changed.",
            },
            {
                icon: "🌿",
                label:
                    "Ask for time apart so you can determine whether your feelings are truly gone or simply changing.",

                stance: 0,

                analysis:
                    "You did not treat sacrifice as either a reason to stay forever or something irrelevant. Instead, you delayed the decision while trying to separate obligation from your actual romantic feelings.",
            },
            {
                icon: "🩹",
                label:
                    "Stay and actively try to rebuild the romantic connection before deciding whether to leave.",

                stance: 1,

                analysis:
                    "You treated the relationship’s history and your partner’s sacrifices as reasons to make an additional effort before leaving, without saying that those sacrifices require you to stay indefinitely.",
            },
        ],
    },

    {
        topic: "Love, Safety, and Personal History",
        beliefId: "belief-4",

        reading: "Berit Brogaard — On Romantic Love, Chapter 4",

        readingSummary:
            "Brogaard discusses rational and irrational love, shared history, and whether what someone has done should change how we understand the person we love. This scenario adds the separate and serious issue of personal safety.",

        requiresContentWarning: true,

        question:
            "Your partner is a military veteran with severe PTSD. One night, while you are both sleeping, they have an episode and strangle you. You scream, and they eventually stop and realize what they have done. You remember how caring and important they have been to you, and you believe they would never intentionally hurt you.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🚪",
                label:
                    "End the relationship because loving someone does not require remaining in a situation where you no longer feel safe.",

                stance: 0,

                analysis:
                    "Your decision does not necessarily say that this one event defines the person. Instead, you treated present safety as a separate value that can outweigh the relationship’s history.",
            },
            {
                icon: "🧑‍⚕️",
                label:
                    "Separate temporarily while your partner receives professional help, then reconsider the relationship later.",

                stance: 1,

                analysis:
                    "You left open the possibility that this event does not permanently define your partner while still creating distance because of the seriousness of what happened.",
            },
            {
                icon: "💞",
                label:
                    "Remain in the relationship because you believe the incident does not represent who your partner truly is.",

                stance: 2,

                analysis:
                    "You placed strong weight on the person’s previous character and relationship history. Your choice treats the event as something that may not define who they are overall.",
            },
            {
                icon: "🧭",
                label:
                    "Continue only if there are major changes, professional treatment, and a process for rebuilding trust.",

                stance: 1,

                analysis:
                    "You did not define your partner entirely by the event, but you also did not ignore it. Your response makes the future of the relationship depend on change, treatment, and restored safety.",
            },
        ],
    },

    {
        topic: "Love and Family Pressure",
        beliefId: "belief-5",

        reading: "Helen Fisher — Why We Love, Chapter 1",

        readingSummary:
            "Fisher describes the “Romeo and Juliet” effect: barriers and adversity can intensify romantic passion rather than weaken it. This scenario asks how much family and financial pressure should matter in a romantic decision.",

        quote: "Adversity can heighten romantic passion.",

        question:
            "You have been with your partner for a long time, but your parents disapprove of the relationship. If you remain with your partner, you will lose your inheritance. You love your partner, but you also have a good relationship with your parents and do not want to lose everything.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "💛",
                label:
                    "Stay with your partner because your family should not determine who you are allowed to love.",

                stance: -2,

                analysis:
                    "You treated romantic choice as something that should remain largely independent of family approval, even when the financial and emotional consequences are serious.",
            },
            {
                icon: "🏠",
                label:
                    "End the relationship because maintaining your family connection and financial future matters more.",

                stance: 2,

                analysis:
                    "You gave family relationships and financial consequences substantial weight in the romantic decision. Love mattered, but it did not automatically override those outside pressures.",
            },
            {
                icon: "🕊️",
                label:
                    "Refuse to choose immediately and try to repair the conflict between your family and partner.",

                stance: 1,

                analysis:
                    "You treated family approval as important enough to address, but not important enough to immediately end the relationship. Your response tries to preserve both commitments.",
            },
        ],
    },

    {
        topic: "Privacy, Fantasy, and Desire",
        beliefId: "belief-6",

        reading: "Amia Srinivasan — “The Right to Sex”",

        readingSummary:
            "Srinivasan emphasizes that another person’s desire does not create a right to sexual access. This scenario also asks how much privacy a partner may reasonably keep around fantasy and desire.",

        quote:
            "“No one is under an obligation to have sex with anyone else.”",

        question:
            "You need to complete some work, so you use your partner’s computer. You find a strange-looking tab and discover that your partner has been using an AI chatbot to fulfill fantasies without telling you. You feel betrayed and inadequate.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🗣️",
                label:
                    "Confront them and ask why they are looking to fulfill desires with AI in secret.",

                stance: 0,

                analysis:
                    "You did not automatically treat the fantasy as acceptable or unacceptable. Instead, you focused on secrecy and meaning, which leaves room for privacy while still asking what the behavior means for the relationship.",
            },
            {
                icon: "💭",
                label:
                    "Ignore what you saw and convince yourself that some private fantasies and secrets are acceptable in a relationship.",

                stance: 2,

                analysis:
                    "You gave substantial weight to individual privacy even though the discovery made you uncomfortable. Your response suggests that not every fantasy needs to be shared with a partner.",
            },
            {
                icon: "🚧",
                label:
                    "Tell them you feel betrayed and make it clear that continuing the secret behavior could end the relationship.",

                stance: -1,

                analysis:
                    "You treated the secrecy as a relationship boundary rather than simply a private fantasy. Your response places relational transparency above a broad right to keep this part of one’s inner life private.",
            },
            {
                icon: "🧩",
                label:
                    "Ask what is lacking in the current relationship that made them seek fulfillment elsewhere.",

                stance: 0,

                analysis:
                    "You interpreted the discovery as information about the relationship rather than purely an invasion of privacy or betrayal. The focus shifts to unmet desires without assuming that you are obligated to satisfy them.",
            },
        ],
    },

    {
        topic: "Change and the Weight of the Past",
        beliefId: "belief-7",

        reading: "Berit Brogaard — On Romantic Love, Chapter 4",

        readingSummary:
            "Brogaard connects love with shared history and personal identity. This scenario asks whether genuine change can alter how much moral and emotional weight we give to something a partner did earlier.",

        question:
            "You have been in a loving and happy relationship for two and a half years. However, the relationship did not begin this way. Early on, your partner did something disturbing. You forgave them, and they have changed for the better, but the memory still lingers. You cannot forget what happened even though they are no longer the same person.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "✅",
                label:
                    "Stay with them because of who they are now and try not to let the past control the relationship.",

                stance: 2,

                analysis:
                    "You gave strong weight to the person your partner has become. Your response treats genuine change as relevant to whether the past should continue determining the relationship.",
            },
            {
                icon: "🗣️",
                label:
                    "Be open with them that although you forgave them, you still cannot ignore the effect of what they did.",

                stance: 1,

                analysis:
                    "You accepted that a person can change without assuming that change erases the impact of the past. Your choice holds present character and historical harm together.",
            },
            {
                icon: "🌿",
                label:
                    "Take a break from the relationship to gather your thoughts and decide whether you can move past it.",

                stance: 0,

                analysis:
                    "You remained uncertain about whether genuine change is enough. Rather than letting either the past or the present decide automatically, you created distance to evaluate both.",
            },
            {
                icon: "🧠",
                label:
                    "Seek couples counseling before deciding whether the past should affect the future of the relationship.",

                stance: 1,

                analysis:
                    "You treated change as meaningful but not automatically sufficient. Your response suggests that the relationship may continue if the lingering effects of the past can be addressed.",
            },
        ],
    },

    {
        topic: "Remaining Feelings for an Ex",
        beliefId: "belief-8",

        reading: "Berit Brogaard — On Romantic Love, Chapter 7",

        readingSummary:
            "Brogaard argues that love is gradable rather than simply on or off. A past relationship can end while some affection remains, and loving one person does not make every feeling for another person disappear.",

        quote: "“Love comes in degrees.”",

        question:
            "You have been with your current partner for a year and genuinely love them. However, thoughts of your ex continue to surface, and you eventually realize that you never completely lost your feelings for them. Your ex texts you, and you do not know how to respond.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🙅",
                label:
                    "Ignore the text out of respect for your current relationship.",

                stance: 2,

                analysis:
                    "You accepted that feelings can exist without assuming that they must be acted on. Your response separates the existence of lingering affection from the validity of your present commitment.",
            },
            {
                icon: "💬",
                label:
                    "Respond to your ex and see whether you still want them or simply miss the memories.",

                stance: 0,

                analysis:
                    "You treated the lingering feelings as significant enough to investigate. This does not necessarily invalidate your current relationship, but it does make the unresolved feelings part of a new decision.",
            },
            {
                icon: "💞",
                label:
                    "Tell your current partner about your feelings for your ex and the message before deciding what to do.",

                stance: 2,

                analysis:
                    "You treated multiple feelings as something that can exist alongside a current relationship, while emphasizing honesty about the conflict rather than assuming the relationship is automatically invalid.",
            },
            {
                icon: "🧭",
                label:
                    "Take time to reconsider your current and previous relationships before deciding whether to reconnect with your ex.",

                stance: 0,

                analysis:
                    "You treated the continued feelings as potentially meaningful enough to reconsider the present relationship. Your response leaves open whether those feelings are compatible with the commitment you currently have.",
            },
        ],
    },

    {
        topic: "Commitment in Modern Dating",
        beliefId: "belief-9",

        reading:
            "Louise Perry — “People Are Not Products”; Helen Fisher — Why We Love, Chapter 1",

        readingSummary:
            "Perry criticizes dating apps for encouraging a consumer-style search through potential partners, while Fisher notes that early attraction can move among several people before becoming focused on one.",

        quote: "Perry compares dating apps to “shopping sites.”",

        question:
            "You have been using a dating app and matched with someone. You have been talking and spending time together for about three weeks. One day, you attend a party and begin talking to someone you find extremely attractive.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🔥",
                label:
                    "End the current connection and explore the new one because no exclusivity has been established.",

                stance: 2,

                analysis:
                    "You treated the absence of an exclusivity agreement as meaningful. Your response gives you freedom to pursue another attraction rather than treating three weeks of dating as an implied commitment.",
            },
            {
                icon: "💘",
                label:
                    "Stay focused on the person you are already seeing and give that connection a real chance.",

                stance: -1,

                analysis:
                    "You acted as though a developing connection can deserve loyalty before exclusivity is formally discussed. Your response pushes against the idea that every new option remains equally available.",
            },
            {
                icon: "🗣️",
                label:
                    "Talk with the person you are seeing about where the relationship is going before pursuing anyone else.",

                stance: 0,

                analysis:
                    "You did not assume either freedom or commitment. Instead, you made the missing exclusivity conversation itself the important issue before acting on the new attraction.",
            },
            {
                icon: "🤷",
                label:
                    "Continue talking to both people until you have a clearer sense of what you want.",

                stance: 2,

                analysis:
                    "You treated the early stage of dating as nonexclusive and kept both possibilities open. This also places you close to the abundance-of-options problem Perry identifies in modern dating.",
            },
        ],
    },

    {
        topic: "Rejection and Developing Attraction",
        beliefId: "belief-10",

        reading:
            "Amia Srinivasan — “The Right to Sex”; Berit Brogaard — On Romantic Love",

        readingSummary:
            "Srinivasan argues that no one has a right to be desired, while Brogaard’s account of gradable love leaves room for attraction to be uncertain or incomplete rather than simply present or absent.",

        quote: "“No one has a right to be desired.”",

        question:
            "You have been going out with someone for a month and have gone on several dates. They are very interested in you, but you do not feel the same way. They try to arrange another date, but you are not interested.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "✅",
                label:
                    "Tell them directly that you do not see the relationship continuing.",

                stance: -2,

                analysis:
                    "You treated your lack of attraction as sufficient reason to end the connection now rather than waiting to see whether it develops.",
            },
            {
                icon: "⌛",
                label:
                    "Let them down slowly by declining plans and reducing communication until the connection fades.",

                stance: -1,

                analysis:
                    "You still acted on the assumption that the attraction is unlikely to grow, but you chose an indirect way of ending the relationship rather than testing the feeling further.",
            },
            {
                icon: "📵",
                label: "Ghost them without an explanation.",

                stance: -2,

                analysis:
                    "You treated the lack of attraction as decisive and did not feel that more time was needed for romantic interest to develop.",
            },
            {
                icon: "🗓️",
                label:
                    "Go on another date because attraction may develop with more time.",

                stance: 2,

                analysis:
                    "You treated attraction as something that can change rather than a fixed first impression. Your decision directly tests the belief that romantic attraction can grow.",
            },
        ],
    },

    {
        topic: "Casual Sex and Emotional Attachment",
        beliefId: "belief-11",

        reading:
            "Louise Perry — “Loveless Sex Is Not Empowering”; Berit Brogaard — On Romantic Love, Chapter 8",

        readingSummary:
            "Perry is skeptical of the expectation that sex can always remain emotionally detached, while Brogaard argues that casual sex and friends-with-benefits arrangements are not inherently wrong.",

        quote:
            "Brogaard: “There is nothing inherently bad about casual flings...”",

        question:
            "You and a friend have recently gone through breakups and decide to hook up casually with no strings attached. You develop strong feelings for your friend, but you do not know whether to tell them or let the relationship continue as it is.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🗣️",
                label:
                    "Tell them exactly how you feel even though it could end the relationship or friendship.",

                stance: -1,

                analysis:
                    "Your choice recognizes that the arrangement can no longer be emotionally separate for you. The feelings changed what the casual relationship means, even though it began without romantic commitment.",
            },
            {
                icon: "💞",
                label:
                    "Continue casually because being close to them is better than losing the relationship.",

                stance: 0,

                analysis:
                    "You tried to preserve the casual structure even though romantic feelings are now present. This creates tension between the original no-strings agreement and your changed emotional experience.",
            },
            {
                icon: "🧼",
                label:
                    "End the sexual relationship to avoid further pain because you do not expect it to become something more.",

                stance: -1,

                analysis:
                    "You treated emotional attachment as something that makes the casual arrangement difficult to sustain. The decision suggests that sex and romantic feeling are no longer separate in this particular case.",
            },
            {
                icon: "🌱",
                label:
                    "Create some distance and give yourself time to determine whether the feelings are temporary or something deeper.",

                stance: 0,

                analysis:
                    "You did not assume that casual sex inevitably creates love, but you also did not assume that the feelings can simply be ignored. Your response leaves the relationship’s meaning unsettled.",
            },
        ],
    },

    {
        topic: "Jealousy, Trust, and Surveillance",
        beliefId: "belief-12",

        reading: "Helen Fisher — Why We Love, Chapter 7",

        readingSummary:
            "Fisher describes jealousy and possessiveness as common responses to perceived romantic rivals. The scenario then asks whether those feelings justify monitoring a partner without their knowledge.",

        quote:
            "“When either sex sees a partner flirting with others, they can become... possessive.”",

        question:
            "Your partner of five months has been liking another person’s posts and leaving flirtatious comments. You confront them, and they stop for a while. However, you download an app that allows you to spy on your partner and discover that they have started watching the other person’s stories and posts again.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🚨",
                label:
                    "Confront them about breaking the boundary and also admit that you monitored them without their knowledge.",

                stance: 1,

                analysis:
                    "You acknowledged that the relationship problem cannot be reduced to your partner’s behavior alone. Admitting the surveillance suggests that monitoring itself is a trust problem even when your suspicion found something.",
            },
            {
                icon: "🧯",
                label:
                    "Stop monitoring them and say nothing because you recognize that spying has damaged your own sense of trust.",

                stance: 2,

                analysis:
                    "You treated secret monitoring as incompatible with the kind of trust you want in the relationship. Your response gives up proof-seeking even though uncertainty remains.",
            },
            {
                icon: "👀",
                label:
                    "Continue monitoring them until you have stronger evidence that something inappropriate is happening.",

                stance: -2,

                analysis:
                    "You prioritized certainty and evidence over privacy and unmonitored trust. Your response suggests that suspicion can justify continuing to check when you do not feel confident in your partner.",
            },
            {
                icon: "💔",
                label:
                    "End the relationship because reaching the point of secret monitoring suggests the trust is already gone.",

                stance: 2,

                analysis:
                    "You treated the need to monitor as evidence that the relationship no longer has the trust required to continue. Rather than keep checking, you acted on the loss of trust itself.",
            },
        ],
    },

    {
        topic: "Attraction Versus Stability",
        beliefId: "belief-13",

        reading:
            "Helen Fisher — Why We Love, Chapter 4; Berit Brogaard — On Romantic Love, Chapter 7",

        readingSummary:
            "Fisher distinguishes romantic attraction from attachment, while Brogaard argues that love exists in degrees. A person can be caring, stable, and compatible without producing the same experience as intense romantic passion.",

        quote: "Brogaard: “Love comes in degrees.”",

        question:
            "You have been dating someone who seems perfect, but you realize that you are not romantically attracted to them. They have treated you better than anyone else, yet you still do not feel a spark.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "⏳",
                label:
                    "Continue dating them in hopes that attraction may grow.",

                stance: 1,

                analysis:
                    "You gave compatibility and good treatment enough value to keep the relationship going while leaving open the possibility that stronger attraction may appear later.",
            },
            {
                icon: "💔",
                label:
                    "End the relationship because they deserve someone who genuinely feels romantic attraction toward them.",

                stance: -2,

                analysis:
                    "You treated romantic attraction as something a relationship needs beyond compatibility, stability, and good treatment.",
            },
            {
                icon: "🗣️",
                label:
                    "Tell them honestly how you feel and allow both of you to decide whether the relationship is worth continuing.",

                stance: 0,

                analysis:
                    "You did not decide that stability is either sufficient or insufficient on your own. Instead, you made the lack of attraction something both people should openly consider.",
            },
            {
                icon: "🧘",
                label:
                    "Stay because stability, compatibility, and good treatment matter more to you than intense romantic passion.",

                stance: 2,

                analysis:
                    "You directly prioritized the qualities of a stable relationship over the absence of a strong romantic spark. This strongly reflects the idea that passion is not the only basis for a relationship.",
            },
        ],
    },

    {
        topic: "Sexual Boundaries and Obligation",
        beliefId: "belief-14",

        reading:
            "Amia Srinivasan — “The Right to Sex”; Louise Perry — “Consent Is Not Enough”",

        readingSummary:
            "Srinivasan rejects the idea that another person’s desire creates an entitlement to sex. Perry argues that consent has to be understood in relation to pressure and circumstance, not only whether someone eventually says yes.",

        quote:
            "Srinivasan: “No one is under an obligation to have sex with anyone else.”",

        question:
            "You and your partner are having sex, and your partner wants to try something new. You strongly dislike the idea, and your refusal upsets them. They give you an ultimatum, saying that you do not love them because you will not do it and that they will leave if you refuse.",

        context:
            "Choose the response that best reflects what you would actually do.",

        responses: [
            {
                icon: "🛑",
                label:
                    "Maintain your boundary and tell them that refusing a sexual act does not mean you love them less.",

                stance: 2,

                analysis:
                    "You separated love from sexual obligation. Your response rejects the idea that proving love requires participating in an act you do not want.",
            },
            {
                icon: "🚪",
                label:
                    "Step away from the relationship because using love as leverage makes you question whether your boundaries are respected.",

                stance: 2,

                analysis:
                    "You treated the pressure itself as significant. Rather than negotiate the unwanted act, you focused on whether a relationship can remain healthy when love is used as leverage.",
            },
            {
                icon: "⚠️",
                label:
                    "Do the act even though you dislike it because you do not want the relationship to end.",

                stance: -2,

                analysis:
                    "You allowed the threat of losing the relationship to override your original boundary. This creates a direct tension with the belief that love should not create sexual obligations and with Perry’s concern about consent under pressure.",
            },
        ],
    },
];

const state = {
    surveyAnswers: {},
    scenarioChoices: {},
    surveyIndex: 0,
    scenarioIndex: 0,
    selectedScenario: null,
    triggerWarningSeen: false,
};

function showScreen(name) {
    screens.forEach((screen) => {
        screen.hidden = screen.dataset.screen !== name;
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    if (mainNav) {
        mainNav.classList.remove("open");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }
}

function getSurveyQuestion(id) {
    return surveyQuestions.find((question) => question.id === id);
}

function getSurveyAnswer(id) {
    const answerValue = state.surveyAnswers[id];

    return (
        surveyScale.find((option) => option.value === answerValue) || null
    );
}

function getSurveyScore(id) {
    return getSurveyAnswer(id)?.score ?? 0;
}

/*
    =========================
    INTRO SURVEY
    =========================
*/

function renderSurvey() {
    const question = surveyQuestions[state.surveyIndex];
    const form = document.querySelector("#survey-form");
    const nextButton = document.querySelector("#survey-next");

    document.querySelector("#survey-step").textContent =
        `QUESTION ${state.surveyIndex + 1} OF ${surveyQuestions.length}`;

    form.innerHTML = `
        <fieldset>
            <legend>${question.prompt}</legend>

            ${question.options
                .map(
                    (option) => `
                    <label class="answer-option ${
                        state.surveyAnswers[question.id] === option.value
                            ? "selected"
                            : ""
                    }">

                        <input
                            type="radio"
                            name="${question.id}"
                            value="${option.value}"
                            ${
                                state.surveyAnswers[question.id] ===
                                option.value
                                    ? "checked"
                                    : ""
                            }
                        >

                        <span>${option.label}</span>

                        <span class="answer-check" aria-hidden="true">
                            ✓
                        </span>
                    </label>
                `,
                )
                .join("")}
        </fieldset>
    `;

    form.querySelectorAll("input").forEach((input) => {
        input.addEventListener("change", () => {
            form.querySelectorAll(".answer-option").forEach((option) => {
                option.classList.remove("selected");
            });

            input.closest(".answer-option").classList.add("selected");

            nextButton.disabled = false;
        });
    });

    nextButton.disabled = !state.surveyAnswers[question.id];

    nextButton.innerHTML = `
        ${
            state.surveyIndex === surveyQuestions.length - 1
                ? "Start scenarios"
                : "Continue"
        }

        <img src="assets/arrow-right.svg" alt="">
    `;
}

function startSurvey() {
    state.surveyAnswers = {};
    state.scenarioChoices = {};

    state.surveyIndex = 0;
    state.scenarioIndex = 0;

    state.selectedScenario = null;
    state.triggerWarningSeen = false;

    renderSurvey();

    showScreen("survey");
}

/*
    =========================
    SCENARIOS
    =========================
*/

function renderScenario() {
    const currentScenario = scenarioQuestions[state.scenarioIndex];

    const optionsContainer =
        document.querySelector("#scenario-options");

    const nextButton =
        document.querySelector("#scenario-next");

    document.querySelector("#scenario-step").textContent =
        `SCENARIO ${state.scenarioIndex + 1} OF ${scenarioQuestions.length}`;

    document.querySelector("#scenario-progress").style.width =
        `${
            ((state.scenarioIndex + 1) / scenarioQuestions.length) *
            100
        }%`;

    document.querySelector("#scenario-topic").textContent =
        currentScenario.topic.toUpperCase();

    document.querySelector("#scenario-title").textContent =
        currentScenario.question;

    document.querySelector("#scenario-context").textContent =
        currentScenario.context;

    optionsContainer.innerHTML = currentScenario.responses
        .map(
            (response, index) => `
            <button
                class="scenario-option ${
                    state.selectedScenario === index
                        ? "selected"
                        : ""
                }"
                type="button"
                data-option="${index}"
            >

                <span class="option-letter">${String.fromCharCode(65 + index)}</span>

                <span class="option-text">
                    ${response.label}
                </span>

                <span class="select-indicator ${
                    state.selectedScenario === index
                        ? ""
                        : "empty"
                }">
                    ${
                        state.selectedScenario === index
                            ? "✓"
                            : ""
                    }
                </span>
            </button>
        `,
        )
        .join("");

    nextButton.disabled =
        state.selectedScenario === null;

    if (state.selectedScenario === null) {
        nextButton.innerHTML = `
            Choose a response
            <img src="assets/arrow-right.svg" alt="">
        `;
    } else {
        nextButton.innerHTML = `
            ${
                state.scenarioIndex ===
                scenarioQuestions.length - 1
                    ? "See my results"
                    : "Continue"
            }

            <img src="assets/arrow-right.svg" alt="">
        `;
    }

    optionsContainer
        .querySelectorAll("[data-option]")
        .forEach((option) => {
            option.addEventListener("click", () => {
                state.selectedScenario =
                    Number(option.dataset.option);

                renderScenario();
            });
        });
}

function startScenarios() {
    state.scenarioIndex = 0;
    state.scenarioChoices = {};
    state.selectedScenario = null;
    state.triggerWarningSeen = false;

    presentCurrentScenario();
}

function presentCurrentScenario() {
    const currentScenario =
        scenarioQuestions[state.scenarioIndex];

    if (
        currentScenario.requiresContentWarning &&
        !state.triggerWarningSeen
    ) {
        showScreen("trigger-warning");
        return;
    }

    renderScenario();

    showScreen("scenarios");
}

function saveScenarioChoice() {
    if (state.selectedScenario === null) {
        return;
    }

    state.scenarioChoices[state.scenarioIndex] = {
        skipped: false,
        responseIndex: state.selectedScenario,
    };
}

function advanceScenario() {
    if (
        state.scenarioIndex <
        scenarioQuestions.length - 1
    ) {
        state.scenarioIndex += 1;

        state.selectedScenario = null;

        presentCurrentScenario();
    } else {
        renderResults();
    }
}

/*
    =========================
    RESULTS COMPARISON
    =========================
*/

function compareBeliefToChoice(beliefId, stance) {
    const beliefScore = getSurveyScore(beliefId);

    /*
        Neutral intro belief OR mixed scenario choice
        means we don't force an aligned/challenged result.
    */
    if (beliefScore === 0 || stance === 0) {
        return "mixed";
    }

    const sameDirection =
        (beliefScore > 0 && stance > 0) ||
        (beliefScore < 0 && stance < 0);

    return sameDirection
        ? "aligned"
        : "challenged";
}

function getStatusLabel(status) {
    const labels = {
        aligned: "Aligned",
        challenged: "Challenged",
        mixed: "Mixed / nuanced",
        skipped: "Skipped",
    };

    return labels[status] || "Mixed / nuanced";
}

function buildComparisonExplanation(
    status,
    beliefAnswer,
    scenario,
) {
    if (status === "skipped") {
        return "You skipped this scenario, so no belief comparison was made.";
    }

    if (status === "mixed") {
        if (beliefAnswer?.score === 0) {
            return "You began neutral or unsure on this belief, so your scenario choice gives more information than the survey answer alone.";
        }

        return "Your choice did not fall cleanly on one side of the belief. The scenario introduced competing values that made the comparison more complicated.";
    }

    if (status === "aligned") {
        return "Your scenario choice generally reflected the belief you stated in the introductory survey.";
    }

    return "Your scenario choice placed your original belief under tension. In this situation, another value or pressure appears to have mattered more than the position you stated at the beginning.";
}

/*
    Builds one dropdown card for each scenario.
*/
function buildResultCard(scenario, index) {
    const choiceRecord =
        state.scenarioChoices[index];

    const belief =
        getSurveyQuestion(scenario.beliefId);

    const beliefAnswer =
        getSurveyAnswer(scenario.beliefId);

    /*
        Scenario was skipped.
    */
    if (
        !choiceRecord ||
        choiceRecord.skipped
    ) {
        return `
            <details class="scenario-result">

                <summary>

                    <div class="scenario-result-title">

                        <span class="scenario-result-number">
                            Scenario ${index + 1}
                        </span>

                        <strong>
                            ${scenario.topic}
                        </strong>

                    </div>

                    <span class="result-status skipped">
                        Skipped
                    </span>

                </summary>

                <div class="scenario-result-body">

                    <div class="analysis-block">

                        <p class="analysis-label">
                            RELATED INTRO BELIEF
                        </p>

                        <p class="analysis-main">
                            ${belief.prompt}
                        </p>

                        <p class="analysis-sub">
                            Your survey response:
                            <strong>
                                ${
                                    beliefAnswer?.label ||
                                    "Not answered"
                                }
                            </strong>
                        </p>

                    </div>

                    <div class="analysis-block">

                        <p class="analysis-label">
                            COMPARISON
                        </p>

                        <p>
                            You skipped this scenario, so it is not included in the alignment summary.
                        </p>

                    </div>

                    <div class="analysis-block course-block">

                        <p class="analysis-label">
                            CONNECTION TO THE COURSE TEXT
                        </p>

                        <p class="course-reading">
                            ${scenario.reading}
                        </p>

                        <p>
                            ${scenario.readingSummary}
                        </p>

                        ${
                            scenario.quote
                                ? `
                                <blockquote>
                                    ${scenario.quote}
                                </blockquote>
                            `
                                : ""
                        }

                    </div>

                </div>

            </details>
        `;
    }

    const selectedResponse =
        scenario.responses[
            choiceRecord.responseIndex
        ];

    const status =
        compareBeliefToChoice(
            scenario.beliefId,
            selectedResponse.stance,
        );

    return `
        <details class="scenario-result">

            <summary>

                <div class="scenario-result-title">

                    <span class="scenario-result-number">
                        Scenario ${index + 1}
                    </span>

                    <strong>
                        ${scenario.topic}
                    </strong>

                </div>

                <span class="result-status ${status}">
                    ${getStatusLabel(status)}
                </span>

            </summary>

            <div class="scenario-result-body">

                <div class="analysis-block choice-block">

                    <p class="analysis-label">
                        YOUR CHOICE
                    </p>

                    <p class="analysis-main">

                        <span class="result-choice-icon">
                            ${selectedResponse.icon}
                        </span>

                        ${selectedResponse.label}

                    </p>

                </div>

                <div class="analysis-block">

                    <p class="analysis-label">
                        YOUR INITIAL BELIEF
                    </p>

                    <p class="analysis-main">
                        ${belief.prompt}
                    </p>

                    <p class="analysis-sub">
                        You answered:

                        <strong>
                            ${
                                beliefAnswer?.label ||
                                "Not answered"
                            }
                        </strong>
                    </p>

                </div>

                <div class="analysis-block comparison-block">

                    <div class="analysis-label-row">

                        <p class="analysis-label">
                            HOW THEY COMPARE
                        </p>

                        <span class="result-status ${status}">
                            ${getStatusLabel(status)}
                        </span>

                    </div>

                    <p>
                        ${buildComparisonExplanation(
                            status,
                            beliefAnswer,
                            scenario,
                        )}
                    </p>

                </div>

                <div class="analysis-block">

                    <p class="analysis-label">
                        WHAT YOUR SCENARIO RESPONSE EMPHASIZED
                    </p>

                    <p>
                        ${selectedResponse.analysis}
                    </p>

                </div>

                <div class="analysis-block course-block">

                    <p class="analysis-label">
                        CONNECTION TO THE COURSE TEXT
                    </p>

                    <p class="course-reading">
                        ${scenario.reading}
                    </p>

                    <p>
                        ${scenario.readingSummary}
                    </p>

                    ${
                        scenario.quote
                            ? `
                            <blockquote>
                                ${scenario.quote}
                            </blockquote>
                        `
                            : ""
                    }

                </div>

            </div>

        </details>
    `;
}

/*
    Counts alignment results.
*/
function calculateResultsSummary() {
    const counts = {
        aligned: 0,
        challenged: 0,
        mixed: 0,
        skipped: 0,
    };

    scenarioQuestions.forEach(
        (scenario, index) => {
            const choiceRecord =
                state.scenarioChoices[index];

            if (
                !choiceRecord ||
                choiceRecord.skipped
            ) {
                counts.skipped += 1;
                return;
            }

            const selectedResponse =
                scenario.responses[
                    choiceRecord.responseIndex
                ];

            const status =
                compareBeliefToChoice(
                    scenario.beliefId,
                    selectedResponse.stance,
                );

            counts[status] += 1;
        },
    );

    return counts;
}

/*
    Generates a broad closing reflection.
*/
function buildFinalReflection(counts) {
    const completed =
        counts.aligned +
        counts.challenged +
        counts.mixed;

    if (completed === 0) {
        return "There are not enough completed scenarios to compare your choices with your starting beliefs.";
    }

    if (
        counts.challenged >
        counts.aligned
    ) {
        return "Several of the situations led you away from positions you initially expressed in the survey. That does not mean the original beliefs were false. Instead, the scenarios suggest that context and competing values changed which principles you prioritized when the decision became more concrete.";
    }

    if (
        counts.aligned >
        counts.challenged
    ) {
        return "Many of your scenario decisions reflected the beliefs you stated at the beginning. The mixed and challenged cases are especially useful, though, because they show where a general principle became harder to apply once another person, relationship history, or emotional pressure was involved.";
    }

    return "Your results contain a fairly even mix of consistency and tension. Some beliefs carried directly into your decisions, while other situations made you prioritize a competing value. Those differences are the main point of the exercise: broad ideals can become more complicated when they have to be applied to a specific relationship dilemma.";
}

/*
    Renders final results screen.
*/
function renderResults() {
    const counts =
        calculateResultsSummary();

    document.querySelector(
        "#results-summary",
    ).innerHTML = `

        <article class="summary-stat">

            <strong>
                ${counts.aligned}
            </strong>

            <span>
                Aligned
            </span>

            <small>
                Choice generally reflected the starting belief
            </small>

        </article>

        <article class="summary-stat">

            <strong>
                ${counts.challenged}
            </strong>

            <span>
                Challenged
            </span>

            <small>
                Another value or pressure outweighed the starting belief
            </small>

        </article>

        <article class="summary-stat">

            <strong>
                ${counts.mixed}
            </strong>

            <span>
                Mixed
            </span>

            <small>
                The comparison was not clearly one-directional
            </small>

        </article>

        ${
            counts.skipped > 0
                ? `
                <article class="summary-stat">

                    <strong>
                        ${counts.skipped}
                    </strong>

                    <span>
                        Skipped
                    </span>

                    <small>
                        No comparison was made for this scenario
                    </small>

                </article>
            `
                : ""
        }
    `;

    document.querySelector(
        "#scenario-results-list",
    ).innerHTML = scenarioQuestions
        .map((scenario, index) =>
            buildResultCard(
                scenario,
                index,
            ),
        )
        .join("");

    document.querySelector(
        "#final-reflection",
    ).textContent =
        buildFinalReflection(counts);

    document.querySelector(
        "#results-intro",
    ).textContent =
        `You completed ${
            scenarioQuestions.length -
            counts.skipped
        } of ${
            scenarioQuestions.length
        } scenarios and answered ${
            Object.keys(
                state.surveyAnswers,
            ).length
        } introductory belief questions. Open each scenario below to see the comparison.`;

    showScreen("results");
}

/*
    =========================
    SURVEY SUBMIT
    =========================
*/

document
    .querySelector("#survey-form")
    .addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const question =
                surveyQuestions[
                    state.surveyIndex
                ];

            const selected =
                new FormData(
                    event.currentTarget,
                ).get(question.id);

            if (!selected) {
                return;
            }

            state.surveyAnswers[
                question.id
            ] = selected;

            if (
                state.surveyIndex <
                surveyQuestions.length - 1
            ) {
                state.surveyIndex += 1;

                renderSurvey();
            } else {
                startScenarios();
            }
        },
    );

/*
    =========================
    SCENARIO NEXT
    =========================
*/

document
    .querySelector("#scenario-next")
    .addEventListener(
        "click",
        () => {
            if (
                state.selectedScenario ===
                null
            ) {
                return;
            }

            saveScenarioChoice();

            advanceScenario();
        },
    );

/*
    =========================
    CONTENT WARNING
    =========================
*/

document
    .querySelector(
        "#view-trigger-warning",
    )
    .addEventListener(
        "click",
        () => {
            state.triggerWarningSeen =
                true;

            presentCurrentScenario();
        },
    );

document
    .querySelector(
        "#skip-trigger-warning",
    )
    .addEventListener(
        "click",
        () => {
            state.triggerWarningSeen =
                true;

            state.scenarioChoices[
                state.scenarioIndex
            ] = {
                skipped: true,
            };

            advanceScenario();
        },
    );

/*
    =========================
    RESULTS BUTTONS
    =========================
*/

document
    .querySelector("#play-again")
    .addEventListener(
        "click",
        startSurvey,
    );

document
    .querySelector("#back-to-home")
    .addEventListener(
        "click",
        () => {
            showScreen("welcome");
        },
    );

/*
    =========================
    START BUTTONS
    =========================
*/

document
    .querySelectorAll("[data-route]")
    .forEach((control) => {
        control.addEventListener(
            "click",
            () => {
                if (
                    control.dataset.route ===
                    "survey"
                ) {
                    startSurvey();
                }
            },
        );
    });

/*
    =========================
    HASH LINKS
    =========================
*/

document
    .querySelectorAll(
        'a[href^="#"]',
    )
    .forEach((link) => {
        link.addEventListener(
            "click",
            (event) => {
                const target =
                    link
                        .getAttribute(
                            "href",
                        )
                        .slice(1);

                if (
                    target ===
                    "welcome"
                ) {
                    event.preventDefault();

                    showScreen(
                        "welcome",
                    );
                }
            },
        );
    });

/*
    =========================
    MOBILE MENU
    =========================
*/

if (
    menuToggle &&
    mainNav
) {
    menuToggle.addEventListener(
        "click",
        () => {
            const isOpen =
                mainNav.classList.toggle(
                    "open",
                );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen),
            );
        },
    );
}

/*
    Initial screen
*/
showScreen("welcome");