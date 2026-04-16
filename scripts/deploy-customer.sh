#!/bin/bash

# 🚀 DEPLOY SCRIPT FOR CUSTOMERS
# Usage: ./deploy-customer.sh <customer-name> <industry>
# Example: ./deploy-customer.sh "dong-nhan-duong" "thuoc-dong-y"

set -e

CUSTOMER_NAME=$1
INDUSTRY=$2

if [ -z "$CUSTOMER_NAME" ] || [ -z "$INDUSTRY" ]; then
    echo "❌ Usage: ./deploy-customer.sh <customer-name> <industry>"
    echo "📋 Example: ./deploy-customer.sh \"dong-nhan-duong\" \"thuoc-dong-y\""
    exit 1
fi

echo "🚀 Deploying for customer: $CUSTOMER_NAME"
echo "🎨 Industry: $INDUSTRY"

# 1. Create new branch
echo "📦 Creating branch..."
git checkout -b "customer/$CUSTOMER_NAME"

# 2. Update default settings
echo "⚙️ Updating default settings..."
cat > src/config/customer-config.ts << EOF
export const customerConfig = {
  name: "$CUSTOMER_NAME",
  industry: "$INDUSTRY",
  defaultTheme: "$INDUSTRY",
  phone: "0982581222",
  address: "Cu Van, Thái Nguyên"
}
EOF

# 3. Commit changes
echo "💾 Committing changes..."
git add .
git commit -m "Setup for customer: $CUSTOMER_NAME"

# 4. Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod --target production

echo "✅ Deployment complete!"
echo "🌐 URL: https://$CUSTOMER_NAME.industry-themes.vercel.app"
