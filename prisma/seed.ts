async function main() {
  console.log("No auto-seed. Add products via admin panel.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
