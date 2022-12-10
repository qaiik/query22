$g("a").on("mouseover", d => {
    $g(d)
        .wrap("mark")
        .text("changed")
})
