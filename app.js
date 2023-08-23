// Select all the elements with class "bg" and store them in the listBg array
let listBg = document.querySelectorAll(".bg");

// Select the element with class "banner"
let banner = document.querySelector(".banner");

// Select all the elements with class "tab" and store them in the tabs array
let tabs = document.querySelectorAll(".tab");

// Select the element with class "container"
let container = document.querySelector(".container");

// Get the default height of the container
let heightDefault = container.offsetHeight;

/*
 * The line  is used to store the initial height of the container element in a variable called heightDefault.
 * This value is used later in the code to adjust the height of the container element dynamically based on the scroll position, creating the illusion of expanding or contracting as you scroll.
 */

// Initialize a variable to store the previous scroll position
let topBefore = 0;

// Select the <body> element
let body = document.querySelector("body");

// Add a 'wheel' event listener to the window

/*
        The wheel event in JavaScript is triggered when a user scrolls using a mouse wheel or touchpad. 
        It provides information about the scroll direction and amount. 
        This event is often used to create scrolling effects or animations in web applications.

        Properties Assosiated with wheel event
        -------------------------------------
        * event.deltaY: 
        
        Represents the amount of vertical scrolling. 
        Positive values indicate downward scrolling, and negative values indicate upward scrolling.

        * event.deltaX: 
        Represents the amount of horizontal scrolling. 
        Positive values indicate rightward scrolling, and negative values indicate leftward scrolling.
        */
window.addEventListener(
  "wheel",
  function (event) {
    // Prevent the default scrolling behavior
    event.preventDefault();

    // Define the scroll speed and calculate the new scroll value
    const scrollSpeed = 0.2;
    const scrollValue = window.scrollY + (event.deltaY / 3) * scrollSpeed;
    /*
        window.scrollY is a property in JavaScript that returns the number of pixels that the current webpage's document has been vertically scrolled from the top.
        */

    // Perform the actual scroll
    window.scrollTo(0, scrollValue);

    // Store the current scroll position in the 'top' variable
    let top = scrollValue;

    // Loop through each background element in the listBg array
    listBg.forEach((bg, index) => {
      // Apply parallax effect to background elements (except the first one)
      if (index != 0) {
        bg.animate(
          {
            transform: `translateY(${-top * index}px)`,
          },

          /*
          
          transform: translateY(${-top * index}px),: 
          
          This is the CSS transformation applied to the element. It uses the translateY function to move the element vertically. The value -${top * index}px calculates the vertical distance by which the element should be moved based on the scroll position (top) and the index of the element in the array. The negative sign ensures that the element moves in the opposite direction of the scroll.
          */

          { duration: 1000, fill: "forwards" }
        );
      }

      // Apply parallax effect to tab elements and adjust container height
      if (index == listBg.length - 1) {
        tabs.forEach((tab) => {
          tab.animate(
            {
              transform: `translateY(${-top * index}px)`,
            },
            { duration: 500, fill: "forwards" }
          );
        });

        // Adjust container height based on scroll direction
        if (topBefore < top) {
          setHeight = heightDefault - window.scrollY * index;
          container.animate(
            {
              height: `${setHeight + 100}px`,
            },
            { duration: 50, fill: "forwards" }
          );
          topBefore = window.scrollY;
        }
      }

      // Apply animations to tab content elements
      tabs.forEach((tab, index) => {
        if (tab.offsetTop - top <= window.innerHeight * (index + 1)) {
          let content = tab.getElementsByClassName("content")[0];
          let transformContent =
            window.innerHeight * (index + 1) - (tab.offsetTop - top);
          content.animate(
            {
              transform: `translateY(${-transformContent + 100 * index}px)`,
            },
            { duration: 500, fill: "forwards" }
          );
        }
      });
    });
  },
  { passive: false }
);
