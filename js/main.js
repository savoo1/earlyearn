$(".faq-card .question").click(function (e) {
  e.preventDefault();
  if ($(this).parent().hasClass("question_opened")) {
    $(this).parent().removeClass("question_opened");
    $(this).next().css("max-height", "0px");
  } else {
    $(".question_opened").find(".answer").css("max-height", "0px");
    $(".question_opened").removeClass("question_opened");
    $(this).parent().addClass("question_opened");
    var heightinside = $(this).next().find(".in").height() + 50;
    $(this)
      .next()
      .css("max-height", heightinside + "px");
  }
});

$(".navbar .lines").click(function (e) {
  e.preventDefault();
  if ($(this).parent().parent().parent().parent().hasClass("active")) {
    $(this).parent().parent().parent().parent().removeClass("active");
  } else {
    $(this).parent().parent().parent().parent().addClass("active");
  }
});

$(window).on("scroll", function () {
  let scrollTop = $(this).scrollTop();

  if (scrollTop > 150) {
    $(".navbar").addClass("fixed");
  } else {
    $(".navbar").removeClass("fixed show");
  }

  if (scrollTop > 200) {
    $(".navbar").addClass("add2");
  } else {
    $(".navbar").removeClass("add2");
  }

  if (scrollTop > 300) {
    $(".navbar").addClass("show");
  } else {
    $(".navbar").removeClass("show");
  }
});

$(document).ready(function () {
  // Function to detect the section in view and activate the corresponding navbar link
  function checkActiveSection() {
    var scrollPos = $(document).scrollTop();
    var sectionInView = false; // Flag to check if any section is in view

    // Loop through each navbar link
    $(".scroll").each(function () {
      var sectionID = $(this).attr("href"); // Get the href (section ID)

      // Skip links that don't have valid href (like #)
      if (sectionID === "#") return;

      // Get the section by using the 'href' attribute (this links to a specific section)
      var section = $(sectionID);

      // Check if the section is in view (considering the section's offset and height)
      if (
        section.offset().top - 100 <= scrollPos && // Adjust for offset
        section.offset().top + section.height() - 100 > scrollPos
      ) {
        sectionInView = true; // Set flag to true if section is in view
        $(".scroll").removeClass("active"); // Remove active from all links
        $(this).addClass("active"); // Add active to the current link
        $(".navbar").removeClass("active");
      }
    });

    // If no section is in view, remove active from all navbar links
    if (!sectionInView) {
      $(".scroll").removeClass("active");
    }
  }

  // Detect when the page is scrolled and check for the active section
  $(window).on("scroll", function () {
    checkActiveSection();
  });

  // Smooth scrolling when clicking on navbar links
  $(".scroll").click(function (e) {
    e.preventDefault();
    var targetSection = $(this).attr("href"); // Get the section linked by the anchor
    if (targetSection !== "#") {
      // Ensure we don't try to scroll to "#" if it's not a valid section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top - 80, // Adjust scroll position for nav height
        },
        1000
      );
    }
  });

  // Initial check on page load
  checkActiveSection();
});

$(".scroll2").click(function (e) {
  e.preventDefault();
  $("nav").removeClass("nav_active");
  var nameof = "." + $(this).attr("name");
  $(".navbar").removeClass("active");
  $("html, body").animate(
    {
      scrollTop: $(nameof).offset().top - 150,
    },
    1000
  );
});

function isInViewport(elem) {
  const rect = elem.getBoundingClientRect();
  return rect.top >= 0 && rect.top <= window.innerHeight;
}

function animateCount($el) {
  const target = parseInt($el.data("target"));
  const duration = 2000;
  let start = 0;
  const increment = Math.ceil(target / (duration / 20));

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(counter);
    }
    $el.text(`$${start.toLocaleString("de-DE")},00`);
  }, 80);
}

let counted = false;

$(window).on("scroll load", function () {
  const el = document.querySelector(".countnumber");
  if (!counted && isInViewport(el)) {
    counted = true;
    animateCount($(".countnumber"));
  }
});

$(document).ready(function () {
  // Show or hide the button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  // Scroll to top on click
  $(".back-to-top").click(function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, 600);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  function setupMobileScrolling() {
    const boxesContainer = document.querySelector(".forscrollmobile .boxes");
    if (!boxesContainer) return;

    // Check if we're on mobile
    if (window.innerWidth < 1000) {
      // Check if we haven't already duplicated the content
      if (!boxesContainer.dataset.duplicated) {
        // Clone all boxes and append them for seamless looping
        const boxes = boxesContainer.querySelectorAll(".box");
        boxes.forEach((box) => {
          const clone = box.cloneNode(true);
          boxesContainer.appendChild(clone);
        });
        boxesContainer.dataset.duplicated = "true";
      }
    } else {
      // If resized to desktop, remove duplicates if they exist
      if (boxesContainer.dataset.duplicated) {
        const boxes = boxesContainer.querySelectorAll(".box");
        const originalCount = boxes.length / 2;
        for (let i = boxes.length - 1; i >= originalCount; i--) {
          boxesContainer.removeChild(boxes[i]);
        }
        boxesContainer.dataset.duplicated = "";
      }
    }
  }

  // Run on load and on resize
  setupMobileScrolling();
  window.addEventListener("resize", setupMobileScrolling);
});

$(document).ready(function () {
  $(".language-switcher").each(function () {
    let $dropdown = $(this).find(".language-dropdown");
    let $chosen = $(this).find(".choosen");

    // Function to update the language icon based on the current language
    function updateLanguageIcon(lang) {
      // Get the selected language (can also be from localStorage or a default fallback)
      let $selectedItem = $dropdown.find(`li[data-lang="${lang}"]`);
      if ($selectedItem.length) {
        let flag = $selectedItem.find("img").attr("src");
        let text = $selectedItem.find("span").text().trim();

        // Update chosen language display
        $chosen.html(
          `<img src="${flag}" class="flag-icon"> ${text} <img src="img/arrow-down.svg" alt="arrow down">`
        );
      }
    }

    // Run on load to set the initial icon
    let initialLang = localStorage.getItem("language") || "en"; // Default to English
    updateLanguageIcon(initialLang);

    // Toggle dropdown
    $chosen.on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      $dropdown.toggle();
      $("nav").removeClass("active");
    });

    // Hide dropdown when clicking outside
    $(document).on("click", function (event) {
      if (
        !$chosen.is(event.target) &&
        !$dropdown.is(event.target) &&
        $dropdown.has(event.target).length === 0
      ) {
        $dropdown.hide();
      }
    });

    // Change Language - Using event delegation for list items
    $dropdown.on("click", "li", function () {
      let lang = $(this).data("lang");

      // Check if selected language is English
      if (lang === "en") {
        // Reset language settings (ensure Google Translate is disabled or reset)
        localStorage.setItem("language", "en"); // Save English as the selected language
        updateLanguageIcon("en"); // Update the language icon to English

        // Disable Google Translate translation for English (force it to reset)
        let googleTranslateCombo = document.querySelector(".goog-te-combo");
        if (googleTranslateCombo) {
          googleTranslateCombo.value = "en";
          googleTranslateCombo.dispatchEvent(new Event("change"));

          // If Google Translate is applied, reset the page to English by reloading
          if (
            typeof google &&
            google.translate &&
            google.translate.TranslateElement
          ) {
            let translateElement = google.translate.TranslateElement;
            if (translateElement) {
              google.translate.TranslateElement(
                { pageLanguage: "en", includedLanguages: "en" },
                "google_translate_element"
              );
            }
          }
        }

        // Optionally, reload the page to reset Google Translate if needed
        // location.reload(); // Uncomment if you want to reload the page and reset Google Translate

        return; // Prevent the rest of the translation flow
      }

      // For other languages, update the icon and trigger Google Translate
      updateLanguageIcon(lang);

      // Save the selected language in localStorage
      localStorage.setItem("language", lang);

      // Force Google Translate to change language (for non-English languages)
      let googleTranslateCombo = document.querySelector(".goog-te-combo");
      if (googleTranslateCombo) {
        googleTranslateCombo.value = lang;
        googleTranslateCombo.dispatchEvent(new Event("change"));
      }

      $dropdown.hide(); // Hide dropdown after selection
    });
  });
});

$(document).ready(function () {
  // Function to detect the section in view and activate the corresponding navbar link
  function checkActiveSection() {
    var scrollPos = $(document).scrollTop();
    var sectionInView = false; // Flag to check if any section is in view

    // Loop through each navbar link
    $(".scroll").each(function () {
      var sectionID = $(this).attr("href"); // Get the href (section ID)

      // Skip links that don't have valid href (like #)
      if (sectionID === "#") return;

      // Get the section by using the 'href' attribute (this links to a specific section)
      var section = $(sectionID);

      // Check if the section is in view (considering the section's offset and height)
      if (
        section.offset().top - 100 <= scrollPos && // Adjust for offset
        section.offset().top + section.height() - 100 > scrollPos
      ) {
        sectionInView = true; // Set flag to true if section is in view
        $(".scroll").removeClass("active"); // Remove active from all links
        $(this).addClass("active"); // Add active to the current link
        $(".navbar").removeClass("active");
      }
    });

    // If no section is in view, remove active from all navbar links
    if (!sectionInView) {
      $(".scroll").removeClass("active");
    }
  }

  // Detect when the page is scrolled and check for the active section
  $(window).on("scroll", function () {
    checkActiveSection();
  });

  // Smooth scrolling when clicking on navbar links
  $(".scroll").click(function (e) {
    e.preventDefault();
    var targetSection = $(this).attr("href"); // Get the section linked by the anchor
    if (targetSection !== "#") {
      // Ensure we don't try to scroll to "#" if it's not a valid section
      $("html, body").animate(
        {
          scrollTop: $(targetSection).offset().top - 80, // Adjust scroll position for nav height
        },
        1000
      );
    }
  });

  // Initial check on page load
  checkActiveSection();
});
