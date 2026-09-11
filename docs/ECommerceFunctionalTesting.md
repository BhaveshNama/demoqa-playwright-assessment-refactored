# E-Commerce Functional Testing

## 1. Registration and authentication

**Positive:** register with valid data; sign in with valid credentials; reset a password using a valid account.

**Negative:** duplicate email registration; invalid credentials; expired reset link; blank mandatory fields.

**Edge cases:** very long supported names; leading/trailing spaces; repeated failed logins; session expiration.

## 2. Product search, filtering, and sorting

**Positive:** search by exact and partial product names; filter by category, brand, price, and availability; sort by price and rating.

**Negative:** unsupported characters; no-result search; invalid price range; conflicting filters.

**Edge cases:** special characters, mixed case, large result sets, out-of-stock items appearing in results.

## 3. Product details

**Positive:** correct title, description, price, images, stock, variants, and delivery information.

**Negative:** unavailable variant; invalid quantity; broken image; missing price.

**Edge cases:** last item in stock; maximum allowed quantity; price or stock changes after page load.

## 4. Cart

**Positive:** add, update, and remove items; preserve cart after sign-in; calculate subtotal correctly.

**Negative:** add out-of-stock item; quantity above stock; invalid coupon; removed product.

**Edge cases:** duplicate item addition; zero quantity; maximum cart size; simultaneous price update.

## 5. Checkout and addresses

**Positive:** checkout as supported user type; add/select address; choose delivery method; verify tax and shipping.

**Negative:** missing required address fields; invalid postal code; unsupported delivery region; expired session.

**Edge cases:** address at field-length limits; cart modified in another session; delivery option becomes unavailable.

## 6. Payment

**Positive:** successful payment using each supported method; correct amount; confirmation after authorised payment.

**Negative:** declined card; invalid card data; expired card; insufficient funds; gateway timeout.

**Edge cases:** double-click on Pay; delayed callback; user refreshes or closes during payment; duplicate transaction prevention.

## 7. Orders, cancellation, returns, and refunds

**Positive:** order creation, tracking, permitted cancellation, return initiation, and refund status.

**Negative:** cancel after cutoff; return ineligible item; invalid order ID; refund already processed.

**Edge cases:** partial cancellation; partial return; split shipment; mixed payment methods.

## 8. Promotions, pricing, tax, and shipping

**Positive:** valid coupon; correct discount, tax, shipping, and final total.

**Negative:** expired/ineligible coupon; minimum value unmet; incompatible promotions.

**Edge cases:** rounding; currency conversion; promotion expires during checkout; maximum discount cap.

## 9. Account and security-related behaviour

**Positive:** view profile, addresses, orders, and sign out.

**Negative:** unauthorised order access; restricted action without login; invalid direct URL access.

**Edge cases:** multi-device sessions; stale session; account deactivation while logged in.
